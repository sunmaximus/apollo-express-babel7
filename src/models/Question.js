import mongoose from 'mongoose';

const { Schema } = mongoose;

const questionSchema = new Schema({
  title: String,
  firstPostId: Schema.Types.ObjectId,
  answerIds: [Schema.Types.ObjectId],
}, { collection: 'Question' });

export default mongoose.model('Question', questionSchema);