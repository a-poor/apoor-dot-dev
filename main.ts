

function createHandler(): Deno.ServeHandler {
  return (req, res) => {
    const url = new URL(req.url);
    console.log(url);
    return new Response("Hello, World!");
  };
}


// Run the server if this file is run as a script...
if (import.meta.main) {
  Deno.serve(
    {},
    createHandler(),
  );
}