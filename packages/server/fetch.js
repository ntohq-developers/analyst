const axios    = require("axios")
const { json } = require("express")
const fs       = require('fs')
// const filePath = `./ml/data/history`
// const url      = `https://api.polygon.io/v2/ticks/stocks/nbbo/${ticker}/2020-07-01?reverse=true&limit=50000&apiKey=RAExB0j5opfFUvp2rI5iwV1YdxrhRso9`
const ticker = "MSFT"
const save = `./ml/data/history/${ticker}.json`
const urlHistorical  = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2000-01-01/2022-01-01?adjusted=true&sort=asc&limit=50000&apiKey=RAExB0j5opfFUvp2rI5iwV1YdxrhRso9`


axios.get(urlHistorical).then((response) => {
   return JSON.stringify(response.data.results.map((data) => {
      return {
         "close": data.c,
         "high": data.h,
         "low": data.l,
         "open": data.o,
         "volume": data.v,
         "time": {
            "UTC": (new Date(data.t)).toUTCString(),
            "Date": data.t,
         }
      }
   }))
}).then((data) => {
   fs.writeFile(save, data, (call) => {
      console.log(call)
   })
})