import http from 'k6/http';
import { randomItem } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";

const HOST = "http://localhost:3030";

const paths = [
  "",
  "blog",
  "about",
  "github",
  "not-a-page",
  "blogssss_",
];

export const options = {
  vus: 100,
  duration: '5s',
};

export default function () {
  const p = randomItem(paths);
  http.get(`${HOST}/${p}`, { redirects: 0 });
}
