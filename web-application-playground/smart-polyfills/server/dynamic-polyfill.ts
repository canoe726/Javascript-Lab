import { resolveUserAgent } from 'browserslist-useragent'
import compat from 'core-js-compat/compat'
import { build } from 'esbuild'
import { Router } from 'express'

const polyfillRouter = Router()

const coreJSVersion = '3.35'

function getCoreJSPolyfillList(userAgent: string) {
  try {
    const result = resolveUserAgent(userAgent)
    const majorVersion = parseMajorVersion(result.version)

    return compat({
      targets: `${result.family} >= ${majorVersion}`,
      version: coreJSVersion,
    }).list
  } catch {
    return compat({
      targets: 'IE >= 11',
      version: coreJSVersion,
    }).list
  }
}

function parseMajorVersion(versionString: string) {
  const match = versionString.match(/^(\\d+)\\.*/)

  console.log('match : ', match)

  if (match == null) {
    return versionString
  }
  return match[1]
}

async function buildPolyfillScript(userAgent: string) {
  const script = getCoreJSPolyfillList(userAgent)
  const result = await build({
    stdin: {
      contents: script as unknown as string,
      loader: 'js',
    },
    target: 'es5',
    bundle: true,
    minify: true,
    write: false,
  })
  return result.outputFiles?.[0]?.contents
}

function createCoreJSPolyfillScript(userAgent: string) {
  return getCoreJSPolyfillList(userAgent)
    .filter((x) => !x.startsWith('esnext.'))
    .map((item) => `import "core-js/modules/${item}";`)
    .join('\\n')
}

polyfillRouter.get('/', (req, res) => {
  const userAgent =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'

  res.send(createCoreJSPolyfillScript(userAgent))
})

export { polyfillRouter }
