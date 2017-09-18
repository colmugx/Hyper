import Vue from "vue"

let toastMain = Vue.extend(require('./toast.vue'))

var Toast = function(option) {
  option = option || {}

  if (typeof option === 'string') {
    option = {
      message: option
    }
  }

  let newToast = new toastMain({data: option})
  newToast['vm'] = newToast.$mount()
  document.body.appendChild(newToast['vm'].$el)
  newToast['vm'].visible = true
  newToast['dom'] = newToast['vm'].$el
  newToast['dom'].style.zIndex = 2000

  return newToast['vm']
}

let types: string[] = ['primary', 'danger', 'success']
types.forEach(type => {
  Toast[type] = option => {
    if (typeof option === 'string') {
      option = {
        message: option
      }
    }
    option.type = type
    return Toast(option)
  }
})

export default Toast
