const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 80;
const aws = require('aws-sdk')
const unirest = require('unirest')

let env_var = new aws.S3({
  token: process.env.TOKEN,
  url_scanner: process.env.URL_SCANNER
});

app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'))
})

app.post('/', (req, res) => {
    console.log(req.body.url_val)

    var req_post = unirest("POST", env_var.config.url_scanner);

    req_post.headers({
      "authorization": "bearer " + env_var.config.token,
      "content-type": "application/json"
    });
    
    req_post.type("json");
    req_post.send({
      "url": req.body.url_val
    });

    res.set('Content-Type', 'text/html');

    req_post.end(function (res_post) {
      res.send(Buffer.from('<body>status: '+ res_post.body.status + '<br>Matches:' + res_post.body.matches.toString()));
    });
})

app.listen(port, () => {})
