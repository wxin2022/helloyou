
import MessageConstructor from './index.vue'
import { createApp } from 'vue'

// const Message = null;
// function show(text) {
//   if(!Message) {
//     Message = createApp(MessageConstructor)
//     const div =document.createElement('div')
//     document.body.appendChild(div)
//     Message.mount(div)
//   }

//   Message.show(text)
// }

const messageApp = createApp(MessageConstructor)
const div = document.createElement('div')
document.body.appendChild(div)

// mount 不返回应用本身。相反，它返回的是根组件实例。
const message = messageApp.mount(div)

export default message
