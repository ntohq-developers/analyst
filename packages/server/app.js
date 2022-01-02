const express         = require("express")
const axios           = require("axios")
const { MongoClient } = require('mongodb');
const app             = express()

require("dotenv").config()

const MONGO_URL         = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@main.u7pjf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const mongoClient       = new MongoClient(MONGO_URL);
const STOCK_APIKEY      = process.env.POLYGON_APIKEY
const STOCK_REQUEST_URL = "https://api.polygon.io/"
const STOCK_NEWS_SEARCH = "v2/reference/news?"
const STATUS            = "v1/marketstatus/now?"

const PORT = process.env.PORT || 8080

const buildRequest = ({ url, ...params }) => {
   return Object.keys(params).reduce(
      (accumulator, currentParam) =>
         `${accumulator}${currentParam}=${params[currentParam]}&`,
      url
   )
}

app.use(express.json())

app.get('/', (req, res) => {
   res.sendStatus(403).send({ "message": "PAGE NOT FOUND" })
})

app.get('/ai/quote/:ticker', async (req, res) => {
   const { ticker } = req.params

   await mongoClient.connect()
   const db = mongoClient.db.
   res.sendStatus(503)
})

app.post('/ai/train/', (req, res) => {

})

app.get('/status/', (req, res) => {
   let requestUrl = buildRequest({
      "url": STOCK_REQUEST_URL + STATUS,
      "apiKey": STOCK_APIKEY
   })
   try{
      axios.get(requestUrl).then((response) => {
         res.status(200).send({
            "status": 200,
            "data": response.data.exchanges
         })
      })
   } catch(er) {
      console.log(er)
      res.statu(503).send({
         "status": "503",
         "message": "FAILED TO FETCH DATA FROM API; (app.js) ln:x##"
      })
   }
})


app.get('/news/:ticker', (req, res) => {
   const { ticker } = req.params

   let requestUrl = buildRequest({
      "url": STOCK_REQUEST_URL + STOCK_NEWS_SEARCH,
      "ticker": ticker,
      "order": "asc",
      "limit": 20,
      "sort": "published_utc",
      "apiKey": STOCK_APIKEY
   })
   
   try {
      axios.get(requestUrl).then((response) => {
         return response.data.results.map((news) => {
            return {
               "title":  news.title,
               "url":    news.article_url,
               "image":  news.image_url,
               "getter": news.description
            }
         })
      }).then((data) => {
         res.status(200).send({
            "status": 200,
            "data":   data
         })
      })
   } catch (er) {
      console.log(er)
      res.status(503).send({
         "status": 503,
         "message": "FAILED TO FETCH DATA FROM API; (app.js) ln:x##"
      })
   }
})




app.listen(PORT, () => {
   console.log(`Runnning on http://localhost:${PORT}`)
})