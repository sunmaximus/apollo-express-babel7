import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import cors from 'cors';
import schema from './graphql';

dotenv.config();
const port = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/blog';

// Latest version need to be fix on ObjectID
// https://github.com/graphql/graphql-js/issues/1518
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

// Monoose DeprecationWarning collection.ensureIndex and useNewUrlParser [duplicate]
// https://stackoverflow.com/questions/53394007/monoose-deprecationwarning-collection-ensureindex-and-usenewurlparser
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

mongoose.connect(MONGO_URL);
mongoose.connection.once('open', () => {
  console.log('conneted to database');
});


const app = express();
app.use(express.json());
app.use(helmet());
// allow cross-origin requests. This should be disable on production?
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World..');
});

// GraphQL API
app.use('/graphql', graphqlHTTP(() => ({
  schema,
  graphiql: true,
  pretty: true,
})));

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}/graphql\n`);
});
