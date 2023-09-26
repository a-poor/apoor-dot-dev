import { Hono } from "https://deno.land/x/hono@v3.7.2/mod.ts";
import { logger } from "https://deno.land/x/hono@v3.7.2/middleware.ts";
import { kvData } from "./data.ts";

const app = new Hono();
app.use("*", logger());

app.get("/", () => new Response("", {
  status: 301,
  headers: {
    location: "https://austinpoor.com/",
  },
}));
app.get("/admin/*", (c) => c.notFound());
app.get("/_ping", (c) => c.json({ success: true }));
app.get("/_all", (c) => c.json(Object.values(kvData).map(d => ({key: d.key, link: d.link}))));
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
  const url = new URL(data.link);

  // If the link is internal, add the UTM source...
  if (data.inner) {
    url.searchParams.set("utm_source", "austinpoor.com");
  }

  return new Response("", {
    status: 301,
    headers: {
      location: url.toString(),
    },
  });
});

// Run the server if this file is run as a script...
if (import.meta.main) {
  Deno.serve(app.fetch);
}
