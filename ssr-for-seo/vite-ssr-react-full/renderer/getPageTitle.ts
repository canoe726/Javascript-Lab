export { getPageTitle }
export { getPageDescription }

function getPageTitle(pageContext: {
  exports: { documentProps?: { title: string, description?: string } }
  documentProps?: { title: string, description?: string }
}): string {
  const title =
    // For static titles (defined in the `export { documentProps }` of the page's `.page.js`)
    (pageContext.exports.documentProps || {}).title ||
    // For dynamic tiles (defined in the `export addContextProps()` of the page's `.page.server.js`)
    (pageContext.documentProps || {}).title ||
    'Demo'
  return title
}

function getPageDescription(pageContext: {
  exports: { documentProps?: { title: string, description?: string } }
  documentProps?: { title: string, description?: string }
}): string {
  const description =
    // For static titles (defined in the `export { documentProps }` of the page's `.page.js`)
    (pageContext.exports.documentProps || {}).description ||
    // For dynamic tiles (defined in the `export addContextProps()` of the page's `.page.server.js`)
    (pageContext.documentProps || {}).description ||
    'Demo'
  return description
}
