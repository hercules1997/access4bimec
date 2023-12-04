module.exports = {
  apps: [
    {
      name: "access4bimec",
      script: "node_modules/react-scripts/scripts/start.js",
      watch: true,
      ignore_wacth:['node_modules'],
      env: {
        NODE_ENV: 'development',
        HTTPS: true,
      },
      env_production: {
        NODE_ENV: 'production',
        HTTPS: true,
      }
    }
  ]
}
