const express = require("express")
const stocks  = require("./stock.js")
const app = express()
const port = 3000

app.get('/', (req, res) => {
   res.sendStatus(403)
})

app.get("/stockQuery/", (req, res) => {
   const tiker    = req.query.tiker
   const period   = req.query.period
   const interval = req.query.interval
   let   stock    = new stocks()

   if(tiker != undefined) {
      stock.getData(tiker, period, interval)
      res.sendStatus(200)
   } 
   else {
      res.sendStatus(400)
   } 
})


app.listen(port, () => {
   console.log(`Runnning on http://localhost:${port}`)
})