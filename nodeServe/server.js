var http = require('http');
var fs = require('fs');
var url = require('url');
var util = require('util');
// var mock = require('./mock.js')

// 创建服务器
http.createServer(function (request, response) {
  // // 解析请求，包括文件名
  var pathname = url.parse(request.url).pathname;

  // 输出请求的文件名
  console.log("Request for " + pathname + " received.");
  if (pathname.indexOf('.') !== -1 || pathname === '/') {
    pathname = transformRoute (pathname)
    // 从文件系统中读取请求的文件内容
    fs.readFile(pathname, function (err, data) {
      if (err) {
        console.log(err);
        // HTTP 状态码: 404 : NOT FOUND
        // Content Type: text/plain
        response.writeHead(404, { 'Content-Type': 'text/html' });
      } else {
        // HTTP 状态码: 200 : OK
        // Content Type: text/plain
        response.writeHead(200, { 'Content-Type': 'text/html' });

        // 响应文件内容
        response.write(data.toString());
      }
      //  发送响应数据
      response.end();
    });
  } else {
    console.log('ajax请求')
    
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.write(JSON.stringify(mock[pathname]))
    // response.write('1111')
    response.end();
  }
}).listen(8888);

var mock = {
  '/test': {
    state: 0,
    data: {
      a: 1111,
      b: [1,2,3]
    }
  }
}
function transformRoute (pathname) {
  if (pathname === '/') {
    pathname += 'index.html'
  }
  return pathname.substr(1)
}

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8888/');