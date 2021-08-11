const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(fileUpload({
  createParentPath: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'))
})

app.post('/', (req, res) => {
  console.log(req.files)
  res.sendFile(path.join(__dirname+'/index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
