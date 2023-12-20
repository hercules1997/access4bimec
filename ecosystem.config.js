module.exports = {
  apps: [
    {
      name: "access4bimec",
      script: "node_modules/react-scripts/scripts/start.js",
      watch: true,
      ignore_watch:['node_modules'],
      env_production: {
        NODE_ENV: 'production',
        HTTPS: true,
        SSL_KEY_FILE: '/home/backendacesso/api-acesso/access4bimec/ssl-cert-snakeoil.key',
        SSL_CERT_FILE: '/home/backendacesso/api-acesso/access4bimec/ssl-cert-snakeoil.pem',
      }
    }
  ]
}

