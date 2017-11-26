import Vue from 'vue'
import i18n from 'vue-i18n'
import {menu as zhcn} from '../../helper/i18n/zh-cn'

Vue.use(i18n)

const menuLocate = new i18n({
  locale: 'zh-cn',
  messages: {
    'zh-cn': zhcn
  }
})

export default menuLocate
