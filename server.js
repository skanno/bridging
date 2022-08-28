import config from 'config';
import express from 'express';
import Url from 'url-parse';
import wget from 'wget-improved';

var app = express();

app.get('/', (request, response) => {
  if (request.query.url === undefined || request.query.url === '') {
    response.status(400).send('パラメータが異常です。urlパラメータが存在しません。');

    return;
  }

  let url = new Url(request.query.url);
  const options = {
      protocol: url.protocol,
      host: url.host,
      path: url.pathname,
      method: 'GET'
  };

  let req = wget.request(options, function(res) {
    let content = '';
    if (res.statusCode === 200) {
      res.on('error', function(err) {
        response.status(400).send('存在しないURLです。');
      });
      res.on('data', function(chunk) {
        content += chunk;
      });
      res.on('end', function() {
        response.contentType(res.headers['content-type'])
          .status(200)
          .send(content);
      });
    } else {
      response.status(500);
    }
  });

  req.end();
  req.on('error', function(err) {
    response.status(500);
  });
});

app.listen(config.server_port);