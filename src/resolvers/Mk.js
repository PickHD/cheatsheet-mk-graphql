"use strict"

const Mk = {
  id: (parent) => parent.id,
  title: (parent) => parent.title,
  developer: (parent) => parent.developer,
  publisher: (parent) => parent.publisher,
  story: (parent) => parent.story,
  characters: async (parent, args, context, info) => await context.prisma.mk.findUnique({ where: { id: parent.id } }).characters(),
  secrets: async (parent, args, context, info) => await context.prisma.mk.findUnique({ where: { id: parent.id } }).secrets()
}

module.exports = Mk