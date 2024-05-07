module.exports = {
  apps: [
    {
      name: 'app',
      script: './stress.js',
      instances: 'max',
      exec_mode: 'cluster',
      listen_timeout: 50000,
      kill_timeout: 5000,
    },
  ],
}
