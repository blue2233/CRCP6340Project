import express from "express";
const app = express()
const port = 3000

app.use(express.static('public'));

app.get('/', (req, res) => { // this is basically a get request to the root of the website, which is the index.html file in the public folder
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
