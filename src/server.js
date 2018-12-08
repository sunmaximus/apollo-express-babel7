import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import typeDefs from './schema';
import resolvers from './resolvers';


dotenv.config();
const port = process.env.PORT || 4000;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/chat');
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(express.json());
app.use(helmet());

server.applyMiddleware({ app });

app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
