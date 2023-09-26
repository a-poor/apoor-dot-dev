export type Entry = {
  key: string;
  link: string;
  inner?: boolean;
};

export const data: Readonly<Entry>[] = [
  {
    key: "this",
    link: "https://github.com/a-poor/apoor-dot-dev",
    inner: false,
  },

  // Personal site links...
  { key: "site", link: "https://austinpoor.com", inner: true },
  { key: "home", link: "https://austinpoor.com", inner: true },
  { key: "blog", link: "https://austinpoor.com/blog", inner: true },
  { key: "about", link: "https://austinpoor.com/about", inner: true },
  { key: "projects", link: "https://austinpoor.com/projects", inner: true },
  { key: "email", link: "mailto:hello@austinpoor.com", inner: false },
  { key: "rss", link: "https://austinpoor.com/rss.xml", inner: true },

  // Social links...
  { key: "github", link: "https://github.com/a-poor", inner: false },
  {
    key: "mastodon",
    link: "https://mastodon.social/@austinpoor",
    inner: false,
  },
  { key: "twitter", link: "https://twitter.com/austin_poor", inner: false },
  { key: "linkedin", link: "https://linkedin.com/in/austinpoor", inner: false },
  { key: "medium", link: "https://medium.com/@apoor", inner: false },
  { key: "docker", link: "https://hub.docker.com/u/austinpoor", inner: false },
  {
    key: "bluesky",
    link: "https://bsky.app/profile/imaustin.bsky.social",
    inner: false,
  },
  {
    key: "bsky",
    link: "https://bsky.app/profile/austinpoor.com",
    inner: false,
  },

  // Blog posts...
  {
    key: "command-or-control",
    link: "https://austinpoor.com/blog/command-or-control",
    inner: true,
  },
  {
    key: "ztp",
    link: "https://austinpoor.com/blog/zero-trust-programming",
    inner: true,
  },
  {
    key: "zero-trust",
    link: "https://austinpoor.com/blog/zero-trust-programming",
    inner: true,
  },
  {
    key: "zero-trust-programming",
    link: "https://austinpoor.com/blog/zero-trust-programming",
    inner: true,
  },
  {
    key: "rs-in-js",
    link: "https://austinpoor.com/blog/js-in-rs",
    inner: true,
  },
  {
    key: "color-palettes",
    link: "https://austinpoor.com/blog/algorithmic-color-palettes",
    inner: true,
  },
  {
    key: "color-palettes-blog",
    link: "https://austinpoor.com/blog/algorithmic-color-palettes",
    inner: true,
  },
  {
    key: "spotify",
    link: "https://austinpoor.com/blog/predict-spotify-skips",
    inner: true,
  },
  {
    key: "spotify-skip",
    link: "https://austinpoor.com/blog/predict-spotify-skips",
    inner: true,
  },
  {
    key: "spotify-skip-blog",
    link: "https://austinpoor.com/blog/predict-spotify-skips",
    inner: true,
  },
  {
    key: "ml-grpc",
    link: "https://austinpoor.com/blog/serve-ml-with-grpc",
    inner: true,
  },
  {
    key: "ml-flask",
    link: "https://austinpoor.com/blog/flask-ml-predictions",
    inner: true,
  },
  {
    key: "big-query",
    link: "https://austinpoor.com/blog/big-query-data-augmentation",
    inner: true,
  },
  {
    key: "ds-profile",
    link: "https://austinpoor.com/blog/data-science-profilers",
    inner: true,
  },
  {
    key: "jinja-plot",
    link: "https://austinpoor.com/blog/plots-with-jinja",
    inner: true,
  },
  {
    key: "csv-pg",
    link: "https://austinpoor.com/blog/csv-to-postgres-with-pandas",
    inner: true,
  },

  // Projects...
  {
    key: "short-link-code",
    link: "https://github.com/a-poor/apoor-dot-dev",
    inner: false,
  },
  {
    key: "site-code",
    link: "https://github.com/a-poor/austinpoor-dot-com",
    inner: false,
  },
  {
    key: "vhttp",
    link: "https://github.com/a-poor/austinpoor-dot-com",
    inner: false,
  },
  {
    key: "color-palettes-code",
    link: "https://github.com/a-poor/color-palettes",
    inner: false,
  },
  {
    key: "spotify-code",
    link: "https://github.com/a-poor/spotify-skip-prediction",
    inner: false,
  },
  {
    key: "spotify-skip-code",
    link: "https://github.com/a-poor/spotify-skip-prediction",
    inner: false,
  },
  {
    key: "watercooler",
    link: "https://github.com/a-poor/watercooler",
    inner: false,
  },
];

export const kvData: {[k: string]: Entry} = data.reduce((a, b) => ({...a, [b.key]: b}), {});

