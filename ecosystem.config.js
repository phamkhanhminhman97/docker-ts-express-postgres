const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  apps: [
    {
      name: "uat",
      script: "dist/server.js",
      instances: 1,
      watch: true,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "uat",
        PORT: process.env.PORT,
      },
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "logs/error.log",
      out_file: "logs/out.log",
      merge_logs: true,
    },
    {
      name: "prod",
      script: "dist/main.js",
      instances: "1",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "logs/error-prod.log",
      out_file: "logs/out-prod.log",
      merge_logs: true,
    },
  ],
};