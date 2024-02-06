import { resolveUserAgent } from 'browserslist-useragent'
import compat from 'core-js-compat/compat'
import { build } from 'esbuild'
import { Router } from 'express'
import fs from 'fs'
import path from 'path'

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

  if (match == null) {
    return versionString
  }
  return match[1]
}

async function getCoreJSPolyfillScript(userAgent: string) {
  const polyfillModuleList = createCoreJSPolyfillScript(userAgent)
  const modules = polyfillModuleList
    .map((module) => path.resolve(path.resolve(__dirname, '../'), `node_modules/${module}.js`))
    .map(
      (module) =>
        new Promise((resolve, reject) => {
          fs.readFile(module, 'utf-8', (err, data) => {
            if (err) {
              console.error('Failed to read file : ', err)
              reject(null)
            }

            resolve(data)
          })
        }),
    )

  const loadModules = await Promise.allSettled(modules)
  const polyfillModulesScript = loadModules
    .filter((m) => m.status === 'fulfilled')
    .map((m) => m.status === 'fulfilled' && m.value)
    .join('\\n')

  console.log(polyfillModuleList)

  return polyfillModulesScript
}

async function buildPolyfillScript(userAgent: string) {
  const script = await getCoreJSPolyfillScript(userAgent)
  const result = await build({
    stdin: {
      contents: script,
      loader: 'js',
    },
    target: 'es5',
    bundle: true,
    minify: true,
    write: false,
  })
  console.log('build result : ', result.outputFiles?.[0]?.contents)
  return result.outputFiles?.[0]?.contents
}

function createCoreJSPolyfillScript(userAgent: string) {
  const polyfillList = getCoreJSPolyfillList(userAgent)
    .filter((x) => !x.startsWith('esnext.'))
    .map((item) => `import "core-js/modules/${item}";`)

  return polyfillList
}

polyfillRouter.get('/', async (req, res) => {
  const userAgent =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'

  const buildScript = await buildPolyfillScript(userAgent)
  const string = new TextDecoder().decode(buildScript)
  console.log('string: ', string)

  res.send(new TextDecoder().decode(buildScript))
})

export { polyfillRouter }
