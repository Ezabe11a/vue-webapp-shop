module.exports = {
    devServer: {
        port: '8090',
        // 代理配置
        proxy: {
            '/api': {
              target: 'http://localhost:3080',  
              ws: true,
              changeOrigin: true
            },
        }
    }
}