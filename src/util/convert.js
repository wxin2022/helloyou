/**
 * 转换相关的 函数
 */

/**
 * 获取图片base64编码
 * @param {*} image - 图片文件对象
 * @returns {Promise<String>} - base64
 */
export async function getBase64ByImage (image) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader()

    reader.readAsDataURL(image)
    reader.onload = function (ev) {
      const dataURL = ev.target.result
      resolve(dataURL)
    }

    reader.onerror = (e) => {
      reject(e)
    }
  })
}
