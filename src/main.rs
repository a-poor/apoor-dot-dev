// #![allow(unused_imports)]
// #![allow(unused_variables)]
#![allow(dead_code)]

use std::net::SocketAddr;
use std::collections::HashMap;

use axum::{
    routing::get,
    extract::Path,
    response::Redirect,
    http::Uri,
    Json,
    Router,
};
use serde::Serialize;
use serde_json::{json, Value};
use tracing::Level;
use tower_http::trace::{self, TraceLayer};

#[macro_use]
extern crate lazy_static;


/// The default link to redirect to if no link is found for the given key.
static DEFAULT_LINK: &'static str = "https://austinpoor.com";

lazy_static! {
    /// The mapping of keys to redirect links.
    static ref LINKS: HashMap<&'static str, &'static str> = HashMap::from([
        ("site", "https://austinpoor.com"),
        ("blog", "https://austinpoor.com/blog"),
        ("about", "https://austinpoor.com/about"),
        ("projects", "https://austinpoor.com/projects"),
        ("github", "https://github.com/a-poor"),
        ("mastodon", "https://mastodon.social/@austinpoor"),
        ("twitter", "https://twitter.com/austin_poor"),
        ("linkedin", "https://linkedin.com/in/austinpoor"),
        ("medium", "https://medium.com/@apoor"),
    ]);
}

/// A record for a redirect, used for returning all links.
#[derive(Debug, Clone, Serialize)]
struct RedirectRecord {
    key: String,
    link: String,
    redirect: String,
}


#[tokio::main]
async fn main() {
    // Get the environment config...
    let host = std::env::var("APP_HOST").unwrap_or("127.0.0.1".into());
    let port = std::env::var("APP_PORT").unwrap_or("3030".into());

    // Initialize tracing...
    let subscriber = tracing_subscriber::fmt()
        .with_max_level(Level::INFO)
        .compact()
        .with_target(false)
        .finish();
    tracing::subscriber::set_global_default(subscriber).unwrap();
    tracing::info!("Starting...");

    // Create the app and set up the routes...
    let app = Router::new()
        .route("/", get(root))
        .route("/_ping", get(ping))
        .route("/_all", get(get_all_links))
        .route("/:key", get(get_link))
        .fallback(global_404)
        .layer(
            TraceLayer::new_for_http()
                .on_response(trace::DefaultOnResponse::new().level(Level::INFO)),
        );

    // Run the app with hyper...
    let addr = format!("{}:{}", host, port);
    let addr: SocketAddr = addr.parse().unwrap();
    tracing::info!("Listening at {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}


/// The root route, redirects to the default link.
async fn root() -> Redirect {
    Redirect::temporary(DEFAULT_LINK)
}

/// The ping route, returns a JSON object with a success field.
async fn ping() -> Json<Value> {
    Json(json!({
        "success": true,
    }))
}

/// Returns a JSON array of all links.
async fn get_all_links() -> Json<Value> {
    // Create a vector to store the results...
    let mut links = Vec::new();

    // Iterate through the links and add them to the vector...
    for (k, v) in LINKS.iter() {
        links.push(RedirectRecord {
            key: k.to_string(),
            link: format!("https://apoor.dev/{}", k),
            redirect: v.to_string(),
        });
    }

    // Return the vector as a JSON array...
    Json(json!({
        "links": links,
    }))
}

/// Returns a redirect to the link associated with the given key.
async fn get_link(Path(key): Path<String>) -> Redirect {
    // Get the key from the path and convert it to lowercase...
    let k = key.to_lowercase();
    tracing::debug!("Got request for key: {}", k);

    // Check if the key exists in the links map, if not use the default link...
    let link = match LINKS.get(k.as_str()) {
        Some(link) => {
            tracing::debug!("Found link: {}", link);
            link.clone()
        },
        None => {
            tracing::debug!("No link found for key \"{}\", using default", k);
            DEFAULT_LINK.clone()
        }
    };

    // Return a redirect to the link...
    Redirect::temporary(link)
}

async fn global_404(uri: Uri) -> Redirect {
    tracing::info!("404: Path \"{}\" not found", uri);
    Redirect::temporary(DEFAULT_LINK)
}
