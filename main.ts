import { Hono } from "https://deno.land/x/hono@v3.7.2/mod.ts";
import { logger } from "https://deno.land/x/hono@v3.7.2/middleware.ts";

import { kvData } from "./data.ts";


const app = new Hono();
app.use("*", logger());

app.get("/", (c) => c.text("Hello Deno!"));
app.get("/admin/*", (c) => c.notFound());
app.get("/:key", (c) => {
  // Get the key param...
  const key = c.req.param("key").toLowerCase();

  // Is key in kvData?
  if (!(key in kvData)) {
    return c.notFound();
  }

  // Get the data for the key...
  const data = kvData[key];

  // Get the URL...
  const url = new URL(c.req.url);

  // If the link is internal, add the UTM source...
  if (data.inner) {
    url.searchParams.set("utm_source", "austinpoor.com");
  }

  return c.redirect(url.toString(), 302);
});

// Run the server if this file is run as a script...
if (import.meta.main) {
  Deno.serve(app.fetch);
}
