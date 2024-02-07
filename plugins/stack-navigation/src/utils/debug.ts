const LOG_PREFIX = ''
const showLog = process.env.NODE_ENV !== 'production'

const Log = {
  info: (message: unknown) => {
    if (showLog) {
      console.info(
        `%c[${LOG_PREFIX}] Info %c${message}`,
        'color: green; font-weight: bold',
        'font-weight: bold',
      )
    }
  },
  error: (message: unknown) => {
    if (showLog) {
      console.error(
        `%c[${LOG_PREFIX}] %c${message}`,
        'color: red; font-weight: bold',
        'font-weight: bold',
      )
    }
  },
  log: (message: unknown) => {
    if (showLog) {
      console.log(
        `%c[${LOG_PREFIX}] %c${message}`,
        'color: blue; font-weight: bold',
        'font-weight: bold',
      )
    }
  },
}

export default Log
