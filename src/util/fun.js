/**
 * 防抖， 将多次执行变为最后一次执行
 * @param {Function} fun - 目标函数
 * @param {Nunber} [wait = 50] - 间隔时间，毫秒
 * @param {Boolean} [immediate = false] - 是否立即执行一次
 */
export const debounce = (fun, wait = 100, immediate = false) => {
  let timer = null
  let execImmediate = false // 为立即执行时，是否已经执行
  return function(...args) {
    if (immediate && !execImmediate) {
      fun.apply(this, args)
      execImmediate = true
      return
    }

    if (timer) { clearTimeout(timer) }
    timer = setTimeout(function() {
      fun.apply(this, args)
      timer = null
    }, wait)
  }
}

/**
 * 节流，将多次执行变成隔了一定时间才执行
 */
export const throttle = (fun, daly = 1500, immediate = false) => {
  let lastExecTime = 0 // 最近一次执行，时间戳
  let execImmediate = false // 为立即执行时，是否已经执行
  return function(...args) {
    if (immediate && !execImmediate) {
      fun.apply(this, args)
      execImmediate = true
      return
    }

    let now = Date.now()
    if (now - lastExecTime > daly) {
      fun.apply(this, args)
      lastExecTime = now
    }
  }
}
