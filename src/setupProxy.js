const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8686",
      changeOrigin: true,
    })
  );

  app.use(
    "/authenticate",
    createProxyMiddleware({
      target: "http://localhost:8686",
      changeOrigin: true,
    })
  );
};
