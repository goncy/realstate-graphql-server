const User = require('./User')
const Registry = require('./Registry')

module.exports = {
  ...User,
  ...Registry
}
