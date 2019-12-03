<template>
  <div>
    <nav class="navbar blue-grey darken-4">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click.prevent="$emit('click')">
            <i class="material-icons yellow-text">dehaze</i>
          </a>
          <span class="yellow-text">{{date}}</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a class="dropdown-trigger yellow-text" href="#" data-target="dropdown" ref="dropdown">
              USER NAME
              <i class="material-icons right">arrow_drop_down</i>
            </a>
            <ul id="dropdown" class="dropdown-content">
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#" class="black-text" @click.prevent="logout">
                  <i class="material-icons">assignment_return</i>Выйти
                </a>
              </li>
            </ul>
          </li>
        </ul>
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
    logout () {
      console.log('logout')
      // this.$router.push('/login?message=logout')
      this.$router.push({ path: 'login', query: { message: 'logout' } })
    }
  },
  mounted () {
    this.unterval = setInterval(() => {
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
  }
}
</script>
