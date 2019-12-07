export default {
  install (Vue, options) {
    Vue.prototype.$message = function (html) {
      window.M.toast({ html })
    }
    Vue.prototype.$error = (html) => {
      window.M.toast({ html: `[Error]: ${html}` })
    }
  }
}
