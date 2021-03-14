"use strict"

const Secret = {
  id: (parent) => parent.id,
  platforms: (parent) => parent.platforms,
  title: (parent) => parent.title,
  desc: (parent) => parent.desc
}

module.exports = Secret