<template>
  <client-only>
    <VueApexCharts
      ref="chart"
      :options="chartOptions"
      :series="series"
    ></VueApexCharts>
  </client-only>
</template>

<script>
const dayjs = require('dayjs')

export default {
  props: {
    labels: {
      type: Array,
      default: null
    },
    tikerName: {
      type: String,
      default: ''
    },
    companyName: {
      type: String,
      default: ''
    },
    chartName: {
      type: String,
      default: 'Default Chart'
    },
    inputData: {
      type: Array,
      default: null
    },
    ccType: {
      type: String,
      default: 'Default Chart'
    }
  },
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          id: 'apexchart',
          animations: {
            enabled: false
          }
        },
        colors: ['#ed5a5a', '#17202A'],
        title: {
          text: 'Analyst Chart',
          align: 'left'
        },
        xaxis: {
          type: 'category',
          labels: {
            formatter(val) {
              // May need to add if statments for more robust formating
              // console.warn(new Date(val).get)
              return dayjs(val).format('MMM DD HH:mm')
            }
          }
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      },
      responsive: [
        {
          breakpoint: 1000
        }
      ]
    }
  },
  watch: {
    inputData() {
      this.UpdateChart(this.inputData, this.labels, this.ccType)
    },
    ccType() {
      this.UpdateChartType(this.ccType)
    }
  },
  methods: {
    CleanStockData(data, labels, chartType) {
      const newData = []
      if (chartType === 'line') {
        console.warn(chartType)
        for (let i = 0; i < labels.length; i++) {
          newData.push({
            x: new Date(labels[i]).toDateString(),
            y: data[i].slice(0, 1)
          })
        }
        return newData
      } else if (chartType === 'candlestick') {
        for (let i = 0; i < labels.length; i++) {
          newData.push({
            x: new Date(labels[i]).toDateString(),
            y: data[i].slice(0, 4)
          })
        }
        return newData
      } else {
        alert('An error occurred! Reloading the page.')
        window.location.reload()
      }
    },
    UpdateChartType(newChartType) {
      console.warn(this.labels)
      this.$refs.chart.updateOptions({
        title: {
          text: this.companyName,
          align: 'left'
        },
        series: [
          {
            name: this.tikerName,
            type: newChartType,
            data: this.CleanStockData(this.inputData, this.labels, newChartType)
          }
        ]
      })
    },
    UpdateChart(newData, newLabels, chartType) {
      this.$refs.chart.updateOptions({
        title: {
          text: this.companyName,
          align: 'left'
        },
        series: [
          {
            name: this.tikerName,
            type: chartType,
            data: this.CleanStockData(newData, newLabels, chartType)
          }
        ]
      })
    }
  }
}
</script>
