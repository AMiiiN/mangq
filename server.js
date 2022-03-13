const fs = require('fs');
var utils = require("./utils");
const { graphql, buildSchema } = require('graphql');
const { ApolloServer, gql } = require('apollo-server');

// Import GraphQL data
const data = require('./data/aircraft');
//const data = require('./data/gascompany');
//const data = require('./data/coffeeshop/coffeeshop');

const typeDefs = data.schema;
const resolvers = data.resolver;

// Create ApolloServer instance
const server = new ApolloServer({ typeDefs, resolvers });

// Launch ApolloServer
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
