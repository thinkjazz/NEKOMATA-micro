export default {
  bind (el, { value }) {
    window.M.Tooltip.init(el, { html: value })
  },
  unbind (el) {
    let tooltip = window.M.Tooltip.getInstance(el)
    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}
