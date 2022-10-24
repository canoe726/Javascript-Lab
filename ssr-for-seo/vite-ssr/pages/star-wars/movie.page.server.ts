import fetch from "node-fetch";
import { PageContextServer } from "../../renderer/types";

export async function onBeforeRender(pageContext: PageContextServer) {
  console.log('onBeforeRender')
  // The route parameter of `/star-wars/@movieId` is available at `pageContext.routeParams`
  const { movieId } = pageContext.routeParams;

  // `.page.server.js` files always run in Node.js; we could use SQL/ORM queries here.
  const response = await fetch(`https://swapi.dev/api/films/${movieId}`);
  let movie = await response.json();

  // Our render and hydrate functions we defined earlier pass `pageContext.pageProps` to
  // the root React component `Page`; this is where we define `pageProps`.
  const pageProps = { movie };

  // We make `pageProps` available as `pageContext.pageProps`
  return {
    pageContext: {
      pageProps
    }
  };
}

// By default `pageContext` is available only on the server. But our hydrate function
// we defined earlier runs in the browser and needs `pageContext.pageProps`; we use
// `passToClient` to tell `vite-plugin-ssr` to serialize and make `pageContext.pageProps`
// available to the browser.
export const passToClient = ["pageProps"];