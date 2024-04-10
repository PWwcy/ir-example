/**
 * @description: 拼接接收的数据-Splicing received data
 * @param {*} oldData 原有数据-Existing data
 * @param {*} newData 新数据-New data
 * @param {*} end 结束符-End symbol
 * @return {Buffer}
 */
function joinData(oldData, newData, end = 0x7d) {
  const dataEnd = newData.readUint8(newData.length - 1)
  if (dataEnd === end) {
    return Buffer.concat([oldData, newData], oldData.length + newData.length)
  } else {
    if (!oldData || !oldData.length) {
      oldData = newData
    } else {
      oldData = Buffer.concat(
        [oldData, newData],
        oldData.length + newData.length
      )
    }
  }
  return Buffer.alloc(0)
}

// 转义字符-Escape character
const escape = [
  [0x7c, [0x7c, 0x5c]],
  [0x7d, [0x7c, 0x5d]],
  [0x7e, [0x7c, 0x5e]],
]
/**
 * @description: 接受数据的转义-Accept data escape
 * @param {Buffer} escapeData 转义的数据-Escaped data
 * @param {number} start 开始转义的位置-Starting position for escape
 * @return {Buffer}
 */
function receiveDataEscape(escapeData, start = 0) {
  for (let i = 0; i < escape.length; i++) {
    let buf = Buffer.from(escape[i][1])
    if (escapeData.includes(buf)) {
      const escapeData2 = Buffer.alloc(escapeData.length - 1)
      let buff = Buffer.from([escape[i][0]])
      for (let j = start; j < escapeData.length - 1; j++) {
        const num1 = escapeData.readUInt8(j)
        const num2 = escapeData.readUInt8(j + 1)
        if (escape[i][1][0] == num1 && escape[i][1][1] == num2) {
          escapeData.copy(escapeData2, 0, 0, j)
          buff.copy(escapeData2, j, 0, 1)
          escapeData.copy(escapeData2, j + 1, j + 2)
          return receiveDataEscape(escapeData2, j + 1)
        }
      }
    }
  }
  return escapeData
}
/**
 * @description: 发送数据的转义-Escape of Sending Data
 * @param {Buffer} escapeData 需要转移的数据-Data that needs to be escaped
 * @param {number} start 开始转义下标-Starting to escape subscripts
 * @return {Buffer}
 */
function sendDataEscape(escapeData, start = 0) {
  for (let i = 0; i < escape.length; i++) {
    if (escapeData.includes(escape[i][0])) {
      let buf = Buffer.from(escape[i][1])
      const escapeData2 = Buffer.alloc(escapeData.length + 1)
      for (let j = start; j < escapeData.length; j++) {
        const num = escapeData.readUInt8(j)
        if (num === escape[i][0]) {
          escapeData.copy(escapeData2, 0, 0, j)
          buf.copy(escapeData2, j, 0, 2)
          escapeData.copy(escapeData2, j + buf.length, j + 1)
          return sendDataEscape(escapeData2, j + 1)
        }
      }
    }
  }
  return escapeData
}
/**
 * 检测头部信息-Detect header information
 * @description: 防止粘包-Prevent package sticking
 * @param {Buffer} data 数据-data
 * @return {Buffer}
 */
function checkHead(data) {
  let head = data.readUint8(0)
  // 验证头
  if (head != 0x7e) {
    data.copy(data, 0, 1)
    data = checkHead(data)
  }
  // 验证ID
  else {
    let deviceId = Buffer.alloc(4)
    data.copy(deviceId, 0, 1, 5)
    let flag = deviceId.some(item => item != 0xff)
    if (flag) {
      data = checkHead(data)
    }
  }
  return data
}
/**
 * @description: 格式化时间
 * @param {*} date 时间
 * @return {string}
 */
function formatDate(date = new Date()) {
  let yy = date.getFullYear()
  let MM = date.getMonth() + 1
  let dd = date.getDate()
  let HH = date.getHours()
  let mm = date.getMinutes()
  let ss = date.getSeconds()
  MM = MM.toString().padStart(2, 0)
  dd = dd.toString().padStart(2, 0)
  HH = HH.toString().padStart(2, 0)
  mm = mm.toString().padStart(2, 0)
  ss = ss.toString().padStart(2, 0)
  return `${yy}${MM}${dd}${HH}${mm}${ss}`
}

module.exports = {
  joinData,
  receiveDataEscape,
  sendDataEscape,
  checkHead,
  formatDate,
}
