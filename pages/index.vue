<template>
  <section class="section">
    <div class="columns is-mobile">
      <div class="section">
        <b-field label="Ticker">
          <b-input
            v-model="tickerInput"
            type="text"
            @input="fetchSearchData"
          ></b-input>
        </b-field>
        <ul>
          <li
            v-for="ticker in searchResults"
            :key="ticker.symbol"
            @click="
              tickerInput = ticker.name
              fetchSearchData()
            "
          >
            <b-tooltip :label="ticker.name" position="is-left" animated>
              {{ ticker.symbol }}
            </b-tooltip>
          </li>
        </ul>
      </div>
      <points-chart
        :input-data="data"
        :labels="labels"
        :chart-name="chartLabel"
        class="chart section"
      ></points-chart>
      <div class="section">
        <b-button @click="fetchStockData">Fetch Data</b-button>
        <b-field label="Period">
          <b-input v-model="period" type="text"></b-input>
        </b-field>
        <b-field label="Interval">
          <b-input v-model="interval" type="text"></b-input>
        </b-field>
      </div>
      <div class="section cards">
        <b-button @click="fetchNewsData">Fetch News</b-button>
        <div v-for="article in articles" :key="article.title" class="card">
          <div class="card-image">
            <figure class="image">
              <img :src="article.urlImage" />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">{{ article.title }}</p>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <a :href="article.url" class="card-footer-item">Open article</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PointsChart from '@/components/charts/PointsChart'
import { buildRequest } from '@/util/request.js'
import { switchcaseF } from '@/util/switchcase.js'
import { errorNotificationFactory } from '@/util/notification.js'

const unknownErrorNotification = errorNotificationFactory(
  `Unknown error! Refresh the page and try again.`
)
const serverErrorNotification = errorNotificationFactory(
  'Internal server error!'
)

export default {
  name: 'HomePage',
  components: {
    PointsChart
  },
  data() {
    return {
      labels: [],
      data: [],
      tickerInput: '',
      chartLabel: '',
      searchResults: [],
      period: '',
      interval: '',
      articles: []
    }
  },
  methods: {
    async fetchStockData() {
      const query = buildRequest({
        url: `https://analyst.herokuapp.com/stockQuery/?`,
        ticker: this.tickerInput,
        period: this.period,
        interval: this.interval
      })
      const data = await this.$axios.$get(query)

      this.chartLabel = this.tickerInput
      this.labels = Object.keys(data)
      this.data = Object.values(data).map((timestamp) => timestamp[0])
    },

    async fetchSearchData() {
      const query = buildRequest({
        url: `https://analyst.herokuapp.com/searchQuery/?`,
        ticker: this.tickerInput
      })
      
      try {
        this.searchResults = (await this.$axios.$get(query))['ticker_data']
      } catch (error) {
        switchcaseF({
          500: serverErrorNotification
        })(unknownErrorNotification)(error.response.status)
      } 
    },

    async fetchNewsData() {
      const query = buildRequest({
        url: `https://analyst.herokuapp.com/newsQuery/?`,
        ticker: this.tickerInput
      })

      try {
        const articles = await this.$axios.$get(query)
        this.articles = articles.articles
      } catch (error) {
        switchcaseF({
          500: serverErrorNotification
        })(unknownErrorNotification)(error.response.status)
      }
    }
  }
}
</script>

<style lang="css" scoped>
.cards {
  max-width: 22em;
}

.card {
  margin-top: 2em;
}

.chart {
  height: 22em;
}
</style>
