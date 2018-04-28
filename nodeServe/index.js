var express = require('express');
var app = express();
var server = require('http').createServer(app);

var bodyParser = require('body-parser');
var multer = require('multer'); 

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

var proxy = require('http-proxy-middleware');
var mock = require('./mock');
//指定静态文件的位置
app.use('/', express.static(__dirname + '/static'));

// 设置接口是否转发
var useProxy = true

mockProxy(useProxy)

app.get('/admin/proxy', function (req, res) {
  res.send({
    proxyState: useProxy
  });
});
app.post('/admin/proxy', function (req, res) {
  useProxy = req.body.state === 'true' ? true : false
  // 设置自动更新转换状态不生效 不知道因为啥~
  mockProxy(useProxy)
  res.send('ok');
});

function mockProxy(bool) {
  if (bool) {
    var mockProxyOptions = proxy({
      target: 'https://easy-mock.com',
      pathRewrite: { '^/mock': '/mock/5acc715bba2320641fc677b8/test' },
      changeOrigin: true
    })
    app.use('/mock', mockProxyOptions);
  } else {
    app.use('/mock', mock);
  }
}
//监听端口号
server.listen(80);