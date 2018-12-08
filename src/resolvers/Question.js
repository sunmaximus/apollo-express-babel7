import Post from '../models/Post';
import { promisify } from '../helpers';

const Question = {
  firstPost: question => promisify(Post.findById(question.firstPostId)),
  answers: question => promisify(Post.find({ _id: { $in: question.answerIds } })),
};

export default Question;
