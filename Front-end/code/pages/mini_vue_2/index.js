import MiniVue from './core/mini_vue'

window.vm = new MiniVue({
  el: '#app',
  data: {
      firstName: 'jie',
      lastName: 'zhang'
  }
})