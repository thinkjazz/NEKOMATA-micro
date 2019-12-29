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
export default {
  props: ['value'],
  data: () => {
    return {
      links: [
        { title: 'Счет', url: '/', exact: true, icon: 'account_balance' },
        { title: 'История', url: '/history', icon: 'history' },
        { title: 'Планирование', url: '/planning', icon: 'insert_chart' },
        { title: 'Новая запись', url: '/record', icon: 'add_box' },
        { title: 'Категории', url: '/categories', icon: 'collections' }
      ]
    }
  }
}
</script>
