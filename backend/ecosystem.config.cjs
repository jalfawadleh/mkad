module.exports = {
  apps: [
    {
      name: process.env.PM2_APP_NAME || "mkadifference",
      script: "server.js",
      cwd: __dirname,
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
