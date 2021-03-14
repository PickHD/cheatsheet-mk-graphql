"use strict"

const Character = {
  id: (parent) => parent.id,
  name_char: (parent) => parent.name_char,
  img_char_link: (parent) => parent.img_char_link,
  moves: async (parent, args, context) => await context.prisma.character.findUnique({ where: { id: parent.id } }).moves()
}

module.exports = Character