<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>
    <Loader v-if="loading"/>
    <p class="center" v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link> </p>
    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currency}} из  {{cat.limit | currency}}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
              class= "determinate"  :class="[cat.progressColor]"
              :style="{width: cat.progressPercent + '%'}"

          ></div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import currencyFilter from './../filters/currency.filter'
export default {
  name: 'planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted () {
    let records = await this.$store.dispatch('fetchRecords')
    let categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      let spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return parseInt(total = total + record.amount)
        }, 0)

      let percent = 100 * spend / cat.limit
      let progressPercent = percent > 100 ? 100 : percent
      let progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'
      let tooltipValue = cat.limit - spend
      let tooltip = `${tooltipValue < 0 ? 'Превышен на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`
      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip,
        percent

      }
    })
    this.loading = false
  }

}
</script>
