# 红外客流数据NodeJs对接示例

## 示例目录

- IRService    红外数据对接的服务与逻辑

  - utils     工具
    - crc16.js	验证
    - utils          工具文件
  - data.js 处理数据
  - tcp.js    tcp服务

- index.js      创建示例

  

## crc16.js

```js
/**
 * 数据校验
 * @param {Buffer} buffer 校验的数据
 * @param {number} length 校验的长度
 * @return {Buffer}
 */
crc16Modbus(buffer, length)
```

## utils.js

```js
/**
 * @description: 拼接接收的数据
 * @param {Buffer} oldData 原有数据
 * @param {Buffer} newData 新数据
 * @param {*} end 结束符
 * @return {Buffer}
 */
joinData(oldData, newData, end)
/**
 * @description: 接受数据的转义
 * @param {Buffer} escapeData 转义的数据
 * @param {number} start [start=0] 开始转义的位置
 * @return {Buffer}
 */
receiveDataEscape(escapeData, start)
/**
 * @description: 发送数据的转义
 * @param {Buffer} escapeData 需要转义的数据
 * @param {number} start [start=0] 开始转义下标
 * @return {Buffer}
 */
sendDataEscape(escapeData, start)
/**
 * 检测头部信息
 * @description: 防止粘包
 * @param {Buffer} data 数据
 * @return {Buffer}
 */
checkHead(data)
/**
 * @description: 格式化时间 格式YYYYMMDDHHmmss
 * @param {Date} date 时间
 * @return {string} YYYYMMDDHHmmss
 */
formatDate(date)
```

## data.js

```js
/**
 * @description: 保存心跳数据
 * @param {Array} params 心跳数据
 */
saveHeartbeatData(params)

/**
 * @description: 保存统计的计数数据
 * @param {Array} params 统计计数数据
 */
saveCountData(params)

/**
 * @description: 获取营业时间
 * @return {[string,string]} [开始时间,结束时间][HHmm,HHmm]
 */
getBusinessHours
/**
 * 获取记录周期与上传周期
 * @param {Boolean} hasRecord [hasRecord = false] 是否包含记录周期
 * @return {[number,number]} [上传周期,记录周期]
 */
getCycle(hasRecord)
/**
 * @description: 获取统计方向
 * @return {number} direct 0-双向、1-只进、2-只出
 */
getDirection()
```

## tcp.js

```js
/**
 * @description: TCP 服务
 * @param {number} options.port 端口
 * @param {string} options.host 主机
 * @param {boolean} options.record 是否包含记录周期
 */
class IRTCP{}

// example
// 不包含记录周期
new IRTCP({port: 8085, host: '192.168.0.1', record: false})
// 包含记录周期
new IRTCP({port: 8086, host: '127.0.0.1', record: true})
```

