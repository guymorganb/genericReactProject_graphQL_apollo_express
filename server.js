// run mongosh in terminal to start database connection
// server.js
require('dotenv').config();
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');;
const typeDefs = require('./src/schema/typeDefs');
const resolvers = require('./src/resolvers/resolvers');
const connectDB = require('./config/connection');
const port = process.env.PORT || 3001;
// Note: all database queries will got to the endpoint /graphql and parsed with apollo-server
// all non database related requests are sent directly to regular express endpoints
connectDB(); // Connect to MongoDB

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

// applies the Apollo server as middleware to the Express app. 
// This allows the app to handle GraphQL requests.
async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
  }
  
  startServer().catch((err) => {
    console.error(err);
  });

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}${server.graphqlPath}`);
});

// PORT 80 or 8080 is the default PORT