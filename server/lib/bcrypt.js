const {
  SALT_WORK_FACTOR
} = require('../config')
const bcrypt = require('bcrypt')

module.exports = {
  encrypt(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return reject(password)
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) return reject(password)
          resolve(hash)
        })
      })
    })
  },
  comparePassword(_password, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, hash, function (err, isMatch) {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
};
