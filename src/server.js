import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './schema';
import resolvers from './resolvers';

dotenv.config();
const port = process.env.PORT || 4000;

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(express.json());
app.use(helmet());

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);
