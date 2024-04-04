import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

export class RenderMainServer {
  appProcess: ChildProcessWithoutNullStreams | null = null
  debounce: ReturnType<typeof setTimeout> | null = null
  fileToWatch?: string

  constructor(fileToWatch: string) {
    this.fileToWatch = fileToWatch
  }

  watchFile() {
    fs.watch(path.join('./server', this.fileToWatch), (event, filename) => {
      if (filename && event === 'change') {
        if (this.debounce) {
          clearTimeout(this.debounce)
        }
        this.debounce = setTimeout(() => {
          console.log(`${filename} has changed. Render application is restarting...`)
          this.restartApp()
        }, 1000)
      }
    })
  }

  restartApp() {
    if (this.appProcess) {
      this.appProcess.kill()
    }
    setTimeout(() => {
      this.startApp()
    }, 1000)
  }

  startApp() {
    console.log('Start Render Application')
    this.appProcess = spawn('ts-node', [path.join('./server', this.fileToWatch)])

    this.appProcess.on('close', (code) => {
      if (code !== 1) {
        console.error('Render application is crashed. Restarting...')
        this.startApp()
      }
    })
  }

  startRenders() {
    this.startApp()
    this.watchFile()
  }
}
