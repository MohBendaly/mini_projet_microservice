const { gql } = require('@apollo/server'); 
// Définir le schéma GraphQL 
const typeDefs = `#graphql 
  type Game { 
    id: String! 
    title: String! 
    description: String! 
  } 
 
  type series { 
    id: String! 
    title: String! 
    description: String! 
  } 
 
  type Query { 
    movie(id: String!): Movie 
    movies: [Movie] 
    series(id: String!): series 
    series: [series] 
  } 
`; 
 
module.exports = typeDefs