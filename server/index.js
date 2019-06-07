'use strict';

const http = require('http');
const { readFile } = require('fs');
const { join } = require('path');

const server = http.createServer((req, res) => {
  const param = req.url.slice(1);
  readFile(join(__dirname, './roms', param), (err, data) => {
    if (err) {
      res.end('Some error');
    }
    const jsonBuffer = JSON.stringify(data);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(
      jsonBuffer
    );
  });
});

server.listen(8000);
