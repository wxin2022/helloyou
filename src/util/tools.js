/**
 * 复制内容至粘贴板
 * @param {String} content - 文本
 */
export function executeCopy (text) {
  const input = document.createElement('textarea')
  input.setAttribute('display', 'none')
  document.body.appendChild(input)
  input.value = text

  // 选中文本
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
}

/**
 * 打乱数组
 */
export function shuffleArray(array) {
  return array.sort((a, b) => 0.5 - Math.random())
}

/**
 * 随机16进制颜色
 */
export function randomHex() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')}`
}

/**
 * 
 */
// export function getParameters(URL) {
//   URL = JSON.parse('{"' + decodeURI(URL.split("?")[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +'"}')
//   return JSON.stringify(URL)
// }
