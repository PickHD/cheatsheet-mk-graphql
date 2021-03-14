"use strict"

const User = {
  id: (parent) => parent.id,
  fullname: (parent) => parent.fullname,
  email: (parent) => parent.email,
  password: (parent) => parent.password,
  roles: (parent) => parent.roles
}

module.exports = User