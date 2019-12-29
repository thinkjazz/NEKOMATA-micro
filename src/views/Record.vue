<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link> </p>
    <form class="form" v-else @submit.prevent="handleSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option
            v-for="c in categories"
            :key='c.id'
            :value='c.id'
            >{{c.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>
      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>
      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"

        >
        <label for="amount">Сумма</label>
        <span
        v-if="$v.amount.$dirty && !$v.amount.minValue"
        class="helper-text invalid"
        >Минимальное значение {{$v.amount.$params.minValue.min}}

        </span>
      </div>
      <div class="input-field">
        <input
        id="description"
        type="text"
        v-model="description"
        :class="{invalid: $v.description.$dirty && !$v.description.required}">

        <label for="description">Описание</label>
        <span v-if="$v.description.$dirty && !$v.description.required"
              class="helper-text invalid">Описание ввели юный джедай</span>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">get_app</i>
      </button>
    </form>
  </div>
</template>
<script>
import { required, minValue } from '../../node_modules/vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
  name: 'record',
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''

  }),
  validations: {
    amount: { minValue: minValue(1) },
    description: { required }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if (this.categories.length) {
      this.category = this.categories[0].id
    }
    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select)
      window.M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord () {
      if (this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    async handleSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          let bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', { bill })
          this.$message('Запись создана')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (error) {

        }
      } else {
        this.$message('Недостаточно средств на счёте' + (this.amount - this.info.bill) + ' ')
      }
    }
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
