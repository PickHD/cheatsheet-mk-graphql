"use strict"

const bCrypt = require("bcrypt"),
	jwt = require("jsonwebtoken"),
	{ promisify } = require("util")


/* AUTH SECTION */
const register = async (parent, args, context) => {
	try {
		const checkEmail = await context.prisma.user.findUnique({ where: { email: args.email } }),
			hashedPass = await bCrypt.hash(args.password, 8)

		if (checkEmail) {
			throw new Error("Email Already Used, Please Change to Another")
		} else {
			const user = await context.prisma.user.create({
				data: {
					fullname: args.fullname,
					email: args.email,
					password: hashedPass
				}
			})

			return user

		}

	} catch (e) {
		throw new Error(e)
	}
}
const login = async (parent, args, context) => {
	try {
		const user = await context.prisma.user.findUnique({ where: { email: args.email } }), jwtSignPromise = promisify(jwt.sign).bind(jwt)

		if (!user) {
			throw new Error("Email Not Found")
		} else {
			const validPass = await bCrypt.compare(args.password, user.password)
			if (!validPass) {
				throw new Error("Invalid Password")
			} else {
				const token = await jwtSignPromise({ userId: user.id, userRoles: user.roles }, process.env.JWT_SECRET, {
					expiresIn: process.env.JWT_SECRET_VALID_UNTIL
				})
				return { user, token }
			}
		}

	} catch (e) {
		throw new Error(e)
	}
}

/* CREATE SECTION */
const createMk = async (parent, args, context) => {
	try {
		if (context.payload.userRoles !== "ADMIN") {
			throw new Error("Forbidden Access")
		} else {
			const newMk = await context.prisma.mk.create({
				data: {
					title: args.title,
					developer: args.developer,
					releases: args.releases,
					platforms: { set: args.platforms },
					publisher: args.publisher,
					story: args.story
				}
			})
			return newMk
		}
	} catch (e) {
		throw new Error(e)
	}

}
const createSecret = async (parent, args, context) => {
	try {
		if (context.payload.userRoles !== "ADMIN") {
			throw new Error("Forbidden Access")
		} else {
			const { mkId } = args,
				newSecret = await context.prisma.secret.create({
					data: {
						mk_id: parseInt(mkId),
						platforms: { set: args.platforms },
						title: args.title,
						desc: args.desc
					}
				})
			return newSecret
		}
	} catch (e) {
		throw new Error(e)
	}
}
const createChar = async (parent, args, context) => {
	try {
		if (context.payload.userRoles !== "ADMIN") {
			throw new Error("Forbidden Access")
		} else {
			const { mkId } = args,
				newChar = await context.prisma.character.create({
					data: {
						mk_id: parseInt(mkId),
						name_char: args.name_char,
						img_char_link: args.img_char_link
					}
				})
			return newChar
		}
	} catch (e) {
		throw new Error(e)
	}
}
const createMove = async (parent, args, context) => {
	try {
		if (context.payload.userRoles !== "ADMIN") {
			throw new Error("Forbidden Access")
		} else {
			const { charId } = args,
				newMove = await context.prisma.move.create({
					data: {
						char_id: parseInt(charId),
						spec_moves: { set: args.spec_moves },
						fin_moves: { set: args.fin_moves },
						combos: { set: args.combos },
						morphs: { set: args.morphs }
					}
				})
			return newMove
		}
	} catch (e) {
		throw new Error(e)
	}
}

/* UPDATE SECTION */
const updateMk = async (parent, args, context) => {
	try {
		if (context.payload.userRoles !== "ADMIN") {
			throw new Error("Forbidden Access")
		} else {
			const { id, platforms } = args

			await context.prisma.mk.update({
				where: { id: id },
				data: {
					title: args.title,
					developer: args.developer,
					publisher: args.publisher,
					releases: args.releases,
					platforms: { set: [...platforms] }
				}
			})

			return "Update MK Successfully!"
		}
	} catch (e) {
		throw new Error(e)
	}
}
const updateSecret = async (parent, args, context) => {
	try {
		if (context.payload.userRoles !== "ADMIN") {
			throw new Error("Forbidden Access")
		} else {
			const { id, platforms } = args

			await context.prisma.secret.update({
				where: { id: id },
				data: {
					mk_id: args.mkId,
					title: args.title,
					desc: args.desc,
					platforms: { set: [...platforms] }
				}
			})

			return "Update Secret Successfully!"
		}

	} catch (e) {
		throw new Error(e)
	}
}
const updateChar = async (parent, args, context) => {
	try {
		if (context.payload.userRoles !== "ADMIN") {
			throw new Error("Forbidden Access")
		} else {
			const { id } = args

			await context.prisma.character.update({
				where: { id: id },
				data: {
					mk_id: args.mkId,
					name_char: args.name_char,
					img_char_link: args.img_char_link
				}
			})

			return "Update Character Successfully!"
		}

	} catch (e) {
		throw new Error(e)
	}
}
const updateMove = async (parent, args, context) => {
	try {
		if (context.payload.userRoles !== "ADMIN") {
			throw new Error("Forbidden Access")
		} else {
			const { id, spec_moves, fin_moves, combos, morphs } = args

			await context.prisma.move.update({
				where: { id: id },
				data: {
					char_id: args.charId,
					spec_moves: { set: [...spec_moves] },
					fin_moves: { set: [...fin_moves] },
					combos: { set: [...combos] },
					morphs: { set: [...morphs] }
				}
			})

			return "Update Move Successfully!"
		}

	} catch (e) {
		throw new Error(e)
	}
}


/* DELETE SECTION */
const deleteMk = async (parent, args, context) => {
	try {
		if (context.payload.userRoles !== "ADMIN") {
			throw new Error("Forbidden Access")
		} else {
			const { id } = args

			await context.prisma.mk.delete({ where: { id: id } })

			return "Delete MK Successfully!"
		}

	} catch (e) {
		throw new Error(e)
	}
}
const deleteSecret = async (parent, args, context) => {
	try {
		if (context.payload.userRoles !== "ADMIN") {
			throw new Error("Forbidden Access")
		} else {
			const { id } = args

			await context.prisma.secret.delete({ where: { id: id } })

			return "Delete Secret Successfully!"
		}

	} catch (e) {
		throw new Error(e)
	}
}
const deleteChar = async (parent, args, context) => {
	try {
		if (context.payload.userRoles !== "ADMIN") {
			throw new Error("Forbidden Access")
		} else {
			const { id } = args

			await context.prisma.character.delete({ where: { id: id } })

			return "Delete Character Successfully!"
		}
	} catch (e) {
		throw new Error(e)
	}
}
const deleteMove = async (parent, args, context) => {
	try {
		if (context.payload.userRoles !== "ADMIN") {
			throw new Error("Forbidden Access")
		} else {
			const { id } = args

			await context.prisma.move.delete({ where: { id: id } })

			return "Delete Move Successfully!"
		}
	} catch (e) {
		throw new Error(e)
	}
}

module.exports = { register, login, createMk, createSecret, createChar, createMove, updateMk, updateSecret, updateChar, updateMove, deleteMk, deleteSecret, deleteChar, deleteMove }