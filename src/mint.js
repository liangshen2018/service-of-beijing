import Vue from 'vue'
import {
  Field,
  Button,
  Popup,
  DatetimePicker,
  Swipe,
  SwipeItem,
  Toast
} from 'mint-ui'
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
Vue.component(Popup.name, Popup)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.prototype.$message = Toast
