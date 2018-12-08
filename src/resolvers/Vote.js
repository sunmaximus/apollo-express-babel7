import { promisify } from '../helpers';
import User from '../models/User';

const Vote = {
  author: vote => promisify(User.findById(vote.userId)),
};

export default Vote;
