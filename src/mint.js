import Vue from 'vue'
import {
  Field,
  Button,
  Popup,
  DatetimePicker,
  Swipe,
  SwipeItem,
  Toast,
  TabContainerItem,
  TabContainer,
  Cell,
  Checklist,
  Indicator
} from 'mint-ui'
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
Vue.component(Popup.name, Popup)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Cell.name, Cell)
Vue.component(Checklist.name, Checklist)
Vue.prototype.$message = Toast
Vue.prototype.$loading = Indicator
