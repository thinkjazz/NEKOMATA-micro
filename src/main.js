import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import messagePlugin from './utils/message.plugin'
import Loader from './components/app/Loader'
import tooltipDirective from './directives/tooltip.directive'
import './registerServiceWorker'
import '../node_modules/materialize-css/dist/js/materialize'
import firebase from '../node_modules/firebase/app'
import '../node_modules/firebase/auth'
import '../node_modules/firebase/database'

Vue.config.productionTip = false
Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
firebase.initializeApp({
  apiKey: 'AIzaSyABRVCmMqILVaMVlGB_Cmf39E0diIphhzI',
  authDomain: 'vuecrm-2e568.firebaseapp.com',
  databaseURL: 'https://vuecrm-2e568.firebaseio.com',
  projectId: 'vuecrm-2e568',
  storageBucket: 'vuecrm-2e568.appspot.com',
  messagingSenderId: '1007134230193',
  appId: '1:1007134230193:web:5ae1d16df4b7dc0c11c490'
})
let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
