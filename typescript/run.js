// npm start -- xxx.ts
const { exec } = require('child_process')
const path = require('path')

const args = process.argv.slice(2)

/**
 * process exit code
 * https://stackoverflow.com/questions/43147330/what-is-difference-between-method-process-exit1-and-process-exit0-in-node-js
 */
if (args.length !== 1) {
  console.error('Usage: node run.js <filename.ts>')
  process.exit(1)
}

const inputFile = args[0]

if (path.extname(inputFile) !== '.ts') {
  console.error('Please provide a Typescript file with a .ts extension')
  process.exit(1)
}

const outputFile = inputFile.replace('.ts', '.js')

exec(`tsc ${inputFile}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error compiling ${inputFile}: ${stderr}`)
    process.exit(1)
  }

  exec(`node ${outputFile}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error running ${outputFile}: ${stderr}`)
      process.exit(1)
    }
    console.log(stdout)
  })
})
