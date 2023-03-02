import { check } from "k6";
import http from 'k6/http';
import { randomItem } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";

const HOST = "http://localhost:3030";
const DEFAULT_REDIRECT = "https://austinpoor.com";

const paths = [
  {path: "", redirects: true, default: true},
  // {path: "_ping", redirects: false, default: false},
  // {path: "_all", redirects: false, default: false},
  {path: "blog", redirects: true, default: false},
  {path: "about", redirects: true, default: false},
  {path: "github", redirects: true, default: false},
  {path: "not-a-page", redirects: true, default: true},
  {path: "blogssss_", redirects: true, default: true},
];

export const options = {
  vus: 100,
  duration: '10s',
};

export default function () {
  const p = randomItem(paths);
  const res = http.get(`${HOST}/${p.path}`, { redirects: 0 });
  check(res, {
    "has correct status code": (r) => r.status === (p.redirects ? 307 : 200),
    "returns default if it should": (r) => !p.default || r.headers.Location === DEFAULT_REDIRECT,
  });
}
