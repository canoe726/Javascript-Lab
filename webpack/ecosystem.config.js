module.exports = {
  apps: [
    {
      name: 'app',
      script: './build/main.js',
      instances: 0,
      exec_mode: 'cluster',
      listen_timeout: 50000,
      kill_timeout: 5000,
    },
  ],
}
