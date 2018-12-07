import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { ApolloServer, gql } from 'apollo-server-express';

dotenv.config();
const port = process.env.PORT || 4000;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(express.json());
app.use(helmet());

server.applyMiddleware({ app });

app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
