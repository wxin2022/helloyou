/**
 * 定义全局组件
 */

import yyButton from './button/index.vue'
import yyInput from './form/Input.vue'
import yyFormItem from './form/FormItem.vue'
import yyCodePanel from './codeEditor/CodePanel.vue'
import yyPagination from './pagination/index.vue'
import yySpace from './space/index.vue'
import yyMenu from './menu/index.vue'
import yySelect from './form/select/Select.vue'
import yyOption from './form/select/Option.vue'
import yyImage from './image/index.vue'
import yyRichEditor from './richEditor/index.vue'

import Message from './message/index.js'

const defineGlobalComponent = (app) => {
  app.component('yy-button', yyButton),
  app.component('yy-input', yyInput),
  app.component('yy-form-item', yyFormItem),
  app.component('yy-code-panel', yyCodePanel),
  app.component('yy-pagination', yyPagination)
  app.component('yy-space', yySpace)
  app.component('yy-menu', yyMenu)
  app.component('yy-select', yySelect)
  app.component('yy-option', yyOption)
  app.component('yy-image', yyImage)
  app.component('yy-rich-editor', yyRichEditor)

  app.config.globalProperties.$message = Message
}

export default defineGlobalComponent
