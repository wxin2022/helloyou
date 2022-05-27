// module.exports = {
//     "env": {
//         "browser": true,
//         "node": true,
//         "es2021": true,
//         "amd": true,
//         // 'ecmaVersion': 6
//     },
//     "extends": [
//         "eslint:recommended",
//         // "plugin:vue/essential"
//     ],
//     // "parser": "babel-eslint",
//     "parserOptions": {
//         "ecmaVersion": "latest",
//         // "ecmaVersion": 6,
//         "sourceType": "module",
//         "ecmaFeatures": {
//           "modules": false
//         }
//     },
//     "plugins": [
//         "vue",
//         // "html"
//     ],
//     "rules": {
//       'vue/multi-word-component-names': 0
//     }
// }

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    // "parser": "babel-eslint"
  },
  rules: {
    'vue/multi-word-component-names': 0,
    'import/no-absolute-path': 0
  }
}
