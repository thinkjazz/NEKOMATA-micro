<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize }}</h3>
    </div>
    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: $v.name.dirty && !$v.name.required}"
        >
        <label for="description">{{'Name'|localize}}</label>
        <span

              class="helper-text invalid"
             v-if="$v.name.dirty && !$v.name.required"
              >{{'Message_EnterName'|localize}}</span>
      </div>
       <!-- Switch -->
  <div class="switch">
    <label>
      English
      <input type="checkbox" v-model="isRuLocale">
      <span class="lever"></span>
      Русский
    </label>
  </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{'Update' | localize}}
        <i class="material-icons right">details</i>
      </button>
    </form>
     <div class="page-title">
      <h3>Фотография</h3>
    </div>
     <form class ="form" action="#">
    <div class="file-field input-field">
      <div class="btn">
        <span>Загрузить</span>
        <input type="file">     <i class="material-icons right">cloud_upload
</i>
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text">
      </div>
    </div>
  </form>

  </div>

</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  validations: {
    name: { required }
  },
  mounted () {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      window.M.updateTextFields()
    })
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {}
    }
  }
}
</script>
<style scoped>
.switch {
    margin-bottom: 2rem;
}
</style>
