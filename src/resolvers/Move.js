"use strict"

const Move = {
  id: (parent) => parent.id,
  spec_moves: (parent) => parent.spec_moves,
  fin_moves: (parent) => parent.fin_moves,
  combos: (parent) => parent.combos,
  morphs: (parent) => parent.morphs
}

module.exports = Move