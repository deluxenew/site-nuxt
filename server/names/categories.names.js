const names = require('./list.names')

module.exports = function(route) {
 return names[route] || null
}
