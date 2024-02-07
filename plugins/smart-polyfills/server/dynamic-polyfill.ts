import { resolveUserAgent } from 'browserslist-useragent'
import compat from 'core-js-compat/compat'
import { build } from 'esbuild'
import { Router } from 'express'
import path from 'path'

const polyfillRouter = Router()
const CORE_JS_VERSION = '3.35'

function parseMajorVersion(versionString: string) {
  const match = versionString.match(/^(\\d+)\\.*/)

  if (match == null) {
    return versionString
  }
  return match[1]
}

function getCoreJSPolyfillList(userAgent: string) {
  try {
    const result = resolveUserAgent(userAgent)
    const majorVersion = parseMajorVersion(result.version)

    return compat({
      targets: `${result.family} >= ${majorVersion}`,
      version: CORE_JS_VERSION,
    }).list
  } catch {
    return compat({
      targets: 'IE >= 11',
      version: CORE_JS_VERSION,
    }).list
  }
}

function createCoreJSPolyfillScript(userAgent: string) {
  const polyfillList = getCoreJSPolyfillList(userAgent)
    .filter((x) => !x.startsWith('esnext.'))
    .map((item) =>
      path.resolve(path.resolve(__dirname, '../'), `node_modules/core-js/modules/${item}.js`),
    )

  return polyfillList
}

async function buildPolyfillScript(userAgent: string) {
  const moduleList = createCoreJSPolyfillScript(userAgent)
  const result = await build({
    entryPoints: moduleList,
    outdir: './polyfill',
    target: 'es5',
    bundle: true,
    minify: true,
    write: false,
  })

  const contents = result.outputFiles.map((o) => o.contents)
  const decoder = new TextDecoder()
  const string = contents.reduce((acc, cur) => {
    acc += decoder.decode(cur)
    return acc
  }, '')

  return string
}

polyfillRouter.get('/', async (req, res) => {
  const userAgent = req.get('user-agent')
  if (userAgent === undefined) {
    throw Error('Client exception : user-agent not found in headers')
  }

  const buildScript = await buildPolyfillScript(userAgent)
  const header = `/* No polyfills needed for current settings and browser */`
  const response = buildScript.length === 0 ? header : buildScript

  res.send(response)
})

export { polyfillRouter }
