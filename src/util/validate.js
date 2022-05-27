/**
 * 判断是否为空
 * @param {*} value - 所有类型的值
 */
export function isEmpty (value) {
  const emptyValueList = ['', 'null', 'undefined']
  if (emptyValueList.indexOf(`${value}`) !== -1) {
    return true
  }

  const prototype = Object.prototype.toString.call(value)
  if (prototype === '[object Boolean]') {
    return !value
  }

  if (prototype === '[object Number]') {
    return isNaN(value) || value === Infinity || value === -Infinity
  }

  if (prototype === '[object Array]') {
    return value.length === 0
  }

  if (prototype === '[object Object]') {
    return JSON.stringify(value) === '{}'
  }

  return false
}

/**
 * 判断是否为有效数值
 * @param {*} value - 所有类型的值
 */
export function isNumber (value) {
  const prototype = Object.prototype.toString.call(value)
  if (prototype === '[object Number]') {
    return !isNaN(value) && value !== Infinity && value !== -Infinity
  }

  return false
}
