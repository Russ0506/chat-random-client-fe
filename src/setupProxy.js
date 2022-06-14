const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api',{
      target: process.env.API_SERVER_URL,
      changeOrigin: true,
      pathRewrite: {'^/api' : ''}
    })
  );

  app.use(
    createProxyMiddleware('/cable', {
      target: process.env.SOCKET_URL,
      ws: true,
      changeOrigin: true,
      pathRewrite: {'^/cable' : ''}
    })
  );
};
