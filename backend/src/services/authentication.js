const bcrypt = require('bcrypt')

function ensurePasswordIsStrongEnough (value) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z0-9\d@$!%*?&]{8,}$/
  if (!value.match(regex)) {
    throw new Error('The password must contain at least 8 characters (including at least one uppercase, one lowercase, one number, one special character).')
  }
}

function addAuthenticationOn (User) {
  const encryptPassword = user => {
    if (user.changed('password')) {
      return bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash
      })
    }
  }

  User.authenticate = async (email, password) => {
    const user = await User.findOne({ where: { email, deleted: false } })

    if (!user) {
      return { valid: false, message: 'User not found.' }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (isPasswordValid) return { valid: true, user }
    else return { valid: false, message: 'Incorrect password.' }
  }

  User.beforeCreate(encryptPassword)
  User.beforeUpdate(encryptPassword)
}

  module.exports = {
  ensurePasswordIsStrongEnough,
  addAuthenticationOn
}