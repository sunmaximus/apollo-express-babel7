import mongoose from 'mongoose';
import { ApolloError } from 'apollo-server-express';

import Question from '../models/Question';
import Post from '../models/Post';
import User from '../models/User';

const Mutation = {
  createQuestion: async (_, args) => {
    const questionId = mongoose.Types.ObjectId();
    const postId = mongoose.Types.ObjectId();

    try {
      const query = await Promise.all([ // (id, title, firstPostId)
        Question.create({ _id: questionId, title: args.input.title, firstPostId: postId }),
        Post.create({
          _id: postId,
          content: args.input.content,
          authorId: args.input.authorId,
          questionId,
          isQuestion: true,
        }), //
        User.updateOne({ _id: args.input.authorId }, { $push: { postIds: postId } }),
      ]);
      return query[0];
    } catch (err) {
      throw new ApolloError(err);
    }
  },
  createAnswer: async (_, args) => {
    const postId = mongoose.Types.ObjectId();
    try {
      const query = await Promise.all([ // (id, title, firstPostId)
        Post.create({
          _id: postId,
          content: args.input.content,
          authorId: args.input.authorId,
          questionId: args.input.questionId,
          isQuestion: false,
        }),
        User.updateOne({ _id: args.input.authorId }, { $push: { postIds: postId } }),
      ]);
      return query[0];
    } catch (err) {
      throw new ApolloError(err);
    }
  },
  createUser: async (_, args) => {
    try {
      return await User.create({ username: args.input.username, postIds: [] });
    } catch (err) {
      throw new ApolloError(err);
    }
  },
};

export default Mutation;
