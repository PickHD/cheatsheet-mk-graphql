"use strict"

/*
  ?Author : PickHD <taufikjanuar35@gmail.com>
  !Setup Graphql Server
*/

require("dotenv").config()

const { ApolloServer } = require("apollo-server"),
  { PrismaClient } = require("@prisma/client"),
  prisma = new PrismaClient(),
  fs = require("fs"),
  path = require("path")

//! Import resolvers & utils
const { Mutation, Query, User, Mk, Secret, Character, Move } = require("./resolvers"),
  getPayLoad = require("./utils/verifyJWT.util")

const resolvers = {
  Query,
  Mutation,
  User,
  Mk,
  Secret,
  Character,
  Move
}

const apolloServer = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "./schemas/schema.graphql"), "utf-8"),
  resolvers,
  context: async ({ req }) => {
    return {
      ...req,
      prisma,
      payload:
        req && req.headers.authorization
          ? await getPayLoad(req)
          : null
    }
  }
})


apolloServer.listen(process.env.PORT)
  .then(() => {
    console.log(`Server is running on port : ${process.env.PORT}`)
  })
  .catch(e => console.error(e))