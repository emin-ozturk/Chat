const setupExpress = require('./setups/setupExpress')
const setupMongoDB = require('./setups/setupMongoDB')
const setupSocket = require('./setups/setupSocket')

const server = setupExpress
setupMongoDB
setupSocket.setup(server)
