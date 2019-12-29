<template>
  <ul class="sidenav app-sidenav blue-grey darken-4" :class="{open: value}">
    <router-link
    v-for="link in links"
    :key="link.url"
    tag="li"
    active-class="active"
    :to="link.url"
    :exact="link.exact"

    >

      <a href="#" class="waves-effect waves-orange pointer"><i class="material-icons left">{{link.icon}}</i>
        {{link.title}}

     </a>
    </router-link>
  </ul>
</template>
<script>
import localizeFilter from '../../filters/localize.filter'
export default {
  props: ['value'],
  data: () => {
    return {
      links: [
        { title: localizeFilter('Menu_bill'), url: '/', exact: true, icon: 'account_balance' },
        { title: localizeFilter('Menu_history'), url: '/history', icon: 'history' },
        { title: localizeFilter('Menu_planning'), url: '/planning', icon: 'insert_chart' },
        { title: localizeFilter('Menu_new_record'), url: '/record', icon: 'add_box' },
        { title: localizeFilter('Menu_category'), url: '/categories', icon: 'collections' }
      ]
    }
  }
}
</script>
