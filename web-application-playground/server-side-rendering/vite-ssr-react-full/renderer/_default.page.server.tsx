import { renderToStream } from 'react-streaming/server'
import React from 'react'
import { escapeInject } from 'vite-plugin-ssr'
import { PageShell } from './PageShell'
import { getPageDescription, getPageTitle } from './getPageTitle'
import type { PageContextServer } from './types'

export { render }
export { passToClient }

const passToClient = ['pageProps', 'documentProps', 'someAsyncProps']

async function render(pageContext: PageContextServer) {
  const { Page, pageProps, exports } = pageContext
  const { documentProps } = exports;

  const stream = await renderToStream(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>,
    // We don't need streaming for a pre-rendered app.
    // (We still use react-streaming to enable <Suspsense>.)
    { disable: true }
  )

  const title = getPageTitle(pageContext)
  const description = getPageDescription(pageContext)

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <meta name="description" content="${description}">
      </head>
      <body>
        <div id="page-view">${stream}</div>
      </body>
    </html>`

  return {
    documentHtml,
    // We can return a `pageContext` promise
    pageContext: (async () => {
      return {
        someAsyncProps: 42
      }
    })()
  }
}
