"use strict"

const info = (parent) => {
  return "Cheatsheets for Mortal Kombat 1 (1992), Mortal Kombat 2 (1993) Mortal Kombat 3 (1994)."
}
const getMKs = async (parent, args, context, info) => {
  try {
    const getAllMks = await context.prisma.mk.findMany()
    return getAllMks
  } catch (e) {
    throw new Error(e)
  }
}

const getMoves = async (parent, args, context, info) => {
  try {
    const getAllMoves = await context.prisma.move.findMany()
    return getAllMoves
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = { info, getMKs, getMoves }