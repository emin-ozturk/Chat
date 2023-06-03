const setupExpress = require('./setups/setupExpress')
const setupMongoDB = require('./setups/setupMongoDB')
const setupRoute = require('./setups/setupRoute')

const app = setupExpress
setupMongoDB
setupRoute(app)
