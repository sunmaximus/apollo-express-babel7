import { ApolloError } from 'apollo-server-express';
import Question from '../models/Question';
import User from '../models/User';
import { promisify } from '../helpers';

// This is an example of showing the old code vs. async await

const Query = {
  questions: (_, args) => promisify(Question.find({}).sort('-createdAt').skip(args.query.offset).limit(args.query.limit)),
  question: (_, args) => promisify(Question.findById(args.id)),
  questionCount: () => promisify(Question.count()),
  users: (_, args) => promisify(User.find({}).skip(args.query.offset).limit(args.query.limit)),
  user: async (_, args) => {
    try {
      const user = await User.findById(args.id);
      return user;
    } catch (err) {
      throw new ApolloError(err);
    }
  },
  userCount: async () => {
    try {
      return await User.countDocuments();
    } catch (err) {
      throw new ApolloError(err);
    }
  },
};

export default Query;
