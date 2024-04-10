const { IRTCP } = require('./IRService/tcp')

function initTcp() {
  new IRTCP({
    port: 8085,
    host: '10.10.2.18',
  })
}

initTcp()
