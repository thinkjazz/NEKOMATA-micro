<template>
  <div>
    <nav class="navbar blue-grey darken-4">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" @click.prevent="$emit('click')">
            <i class="material-icons yellow-text">dehaze</i>
          </a>
          <h5>
            <span class="yellow-text">12.12.12</span>
          </h5>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a class="dropdown-trigger yellow-text" href="#" data-target="dropdown" ref="dropdown">
              USER NAME
              <i class="material-icons right">arrow_drop_down</i>
            </a>
            <ul id="dropdown" class="dropdown-content">
              <li>
                <a href="#" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </a>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#" class="black-text">
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
  mounted () {
    window.M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
      alignment: 'right',
      coverTrigger: false,
      autoTrigger: true,
      hover: false
    })
  }
}
</script>
