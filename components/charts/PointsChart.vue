<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    labels: {
      type: Array,
      default: null
    },
    chartName: {
      type: String,
      default: 'Default Chart'
    },
    color: {
      type: String,
      default: '#f87979'
    },
    inputData: {
      type: Array,
      default: null
    }
  },
  computed: {
    chartData() {
      return this.inputData
    }
  },
  watch: {
    inputData() {
      this.$data._chart.destroy()
      this.renderLineChart()
    }
  },
  mounted() {
    this.renderLineChart()
  },
  methods: {
    renderLineChart() {
      this.renderChart(
        {
          labels: this.labels,
          datasets: [
            {
              label: this.chartName,
              borderColor: this.color,
              backgroundColor: 'rgba(0, 0, 0, 0)',
              data: this.chartData
            }
          ]
        },
        { responsive: true, maintainAspectRatio: false }
      )
    }
  }
}
</script>

<style></style>