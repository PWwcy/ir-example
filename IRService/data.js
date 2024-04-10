// 心跳数据 字段对应下标
// The index corresponding to the heartbeat data field
const heartbeatDataToObjectFields = [
  ['sn', 0],
  ['timeStamp', 1],
  ['receivingPower', 2],
  ['transmissionPower', 3],
  ['codeStatus', 4],
  ['version', 5],
]
/**
 * @description: 保存心跳数据---Save heartbeat data
 * @param {Array} params 心跳数据---heartbeat data
 */
function saveHeartbeatData(params) {
  const obj = {}
  heartbeatDataToObjectFields.forEach(item => {
    obj[item[0]] = params[item[1]]
  })
  console.log('heart object', obj)

  // Your code
}

// 计数数据 字段对应下标
// Counting data field corresponding index
const countDataToObjectFields = [
  ['sn', 0],
  ['timeStamp', 1],
  ['inCount', 2],
  ['outCount', 3],
  ['receivingPower', 4],
  ['transmissionPower', 5],
  ['codeStatus', 6],
  ['version', 7],
]
/**
 * @description: 保存统计计数数据---Save statistical count data
 * @param {Array} params 统计计数数据---Statistical count data
 */
function saveCountData(params) {
  const obj = {}
  countDataToObjectFields.forEach(item => {
    obj[item[0]] = params[item[1]]
  })
  console.log('data object', obj)

  // Your code
}

/**
 * @description: 获取营业时间---Obtain business hours
 * @return {[string,string]} [开始时间,结束时间]([start time, end time])
 */
function getBusinessHours() {
  // 开始时间
  // start time
  const startTime = '0000'
  // 结束时间
  // End time
  const endTime = '2359'

  // Your code

  return [startTime, endTime]
}

/**
 * 获取记录周期与上传周期---Obtain record cycle and upload cycle
 * @param {Boolean} hasRecord [hasRecord = false] 是否包含记录周期---Does it include a recording cycle
 * @return {[number,number]} [上传周期,记录周期]([Upload cycle, record cycle])
 */
function getCycle(hasRecord = false) {
  // 记录周期 单位(min)
  // Record cycle Unit (min)
  let recordCycle = hasRecord ? 1 : 0
  // 上传周期 单位(min)
  // Upload cycle Unit (min)
  let uploadCycle = 0

  // Your code

  return [uploadCycle, recordCycle]
}

/**
 * @description: 获取统计方向---Obtain statistical direction
 * @return {number} direct 0-双向、1-只进、2-只出(0:bi-directional, 1:only in, 2:only out)
 */
function getDirection() {
  // Your code

  return 0
}

module.exports = {
  saveHeartbeatData,
  saveCountData,
  getBusinessHours,
  getCycle,
  getDirection,
}
