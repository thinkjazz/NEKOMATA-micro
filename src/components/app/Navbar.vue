<template>
  <div>
    <nav class="navbar blue-grey darken-4">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click.prevent="$emit('click')">
            <i class="material-icons yellow-text">dehaze</i>
          </a>
          <span class="yellow-text">{{date | date('datetime')}}</span>
        </div>
      <div class="navbar-right">  <div class="profile-right">
 <img src="https://materializecss.com/images/yuna.jpg" alt="" class="circle">
      <span class="yellow-text"> {{name}}</span>
     </div>

 <ul class="right hide-on-small-and-down">
          <li>
            <a class="dropdown-trigger yellow-text" href="#" data-target="dropdown" ref="dropdown"
            >

              <i class="material-icons right">arrow_drop_down</i>
            </a>
            <ul id="dropdown" class="dropdown-content">
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">perm_contact_calendar</i>Профиль
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#" class="black-text" @click.prevent="logout">
                  <i class="material-icons">exit_to_app</i>Выйти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

     </div>
    </nav>
</div>
</template>
<script>
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  }),
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      // this.$router.push('/login?message=logout')
      this.$router.push({ path: 'login', query: { message: 'logout' } })
    }
  },
  computed: {
    name () {
      return this.$store.getters.info.name
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    this.dropdown = window.M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
      alignment: 'right',
      coverTrigger: false,
      autoTrigger: true,
      hover: false
    })
  },
  beforeDestroy () {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>
