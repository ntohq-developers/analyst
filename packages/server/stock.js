const Axios = require("axios")

class Stocks
{
   constructor(apikey="test")
   {
      this.key      = apikey
      this.base_url = "https://query1.finance.yahoo.com/"
   }

   getHistoricalData(tiker, period="1d", interval="1m")
   {
      console.log(`Tiker: ${tiker}\nPeriod: ${period}\nInterval: ${interval}`)
   }
}

function cleanStockData()
{

}

module.exports = Stocks