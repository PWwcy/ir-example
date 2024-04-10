# Example of NodeJs docking for infrared passenger flow data

## Example Table of Contents

- IRService---The Service and Logic of Infrared Data Docking

  - utils---Tool
    - crc16.js---Validate
    - utils---Tool files
  - data.js---Processing data
  - tcp.js---TCP service

- index.js---Create an example

  

## crc16.js

```js
/**
 * Data verification 
 * @param {Buffer} buffer Verified data
 * @param {number} length Verified length
 * @return {Buffer}
 */
crc16Modbus(buffer, length)
```

## utils.js

```js
/**
 * @description: Splicing received data
 * @param {Buffer} oldData Existing data
 * @param {Buffer} newData New data
 * @param {*} end [end=0x7d] End symbol
 * @return {Buffer}
 */
joinData(oldData, newData, end)
/**
 * @description: Accept data escape
 * @param {Buffer} escapeData Escaped data
 * @param {number} start [start=0] Starting position for escape
 * @return {Buffer}
 */
receiveDataEscape(escapeData, start)
/**
 * @description: Escape of Sending Data
 * @param {Buffer} escapeData Data that needs to be escaped
 * @param {number} start [start=0] Starting to escape subscripts
 * @return {Buffer}
 */
sendDataEscape(escapeData, start)
/**
 * Detect header information
 * @description: Prevent package sticking
 * @param {Buffer} data Data
 * @return {Buffer}
 */
checkHead(data)
/**
 * @description: Format Time. Format:YYYYMMDDHHmmss
 * @param {Date} date Time
 * @return {string} YYYYMMDDHHmmss
 */
formatDate(date)
```

## data.js

```js
/**
 * @description: Save heartbeat data
 * @param {Array} params Heartbeat data
 */
saveHeartbeatData(params)

/**
 * @description: Save count data for statistics
 * @param {Array} params Statistical count data
 */
saveCountData(params)

/**
 * @description: Obtain business hours
 * @return {[string,string]} [Start time, end time][HHmm,HHmm]
 */
getBusinessHours
/**
 * Obtain record cycle and upload cycle
 * @param {Boolean} hasRecord [hasRecord = false] Does it include a recording cycle
 * @return {[number,number]} [Upload cycle, record cycle]
 */
getCycle(hasRecord)
/**
 * @description: Obtain statistical direction
 * @return {number} direct 0: bidirectional, 1: only in, 2: only out
 */
getDirection()
```

## tcp.js

```js
/**
 * @description: TCP service
 * @param {number} options.port port
 * @param {string} options.host main engine
 * @param {boolean} options.record [options.record=false] Does it include a recording cycle
 */
class IRTCP{}

// example
// Excluding recording cycles
new IRTCP({port: 8085, host: '192.168.0.1', record: false})
// Including recording period
new IRTCP({port: 8086, host: '127.0.0.1', record: true})
```

