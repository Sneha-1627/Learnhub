import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  C_title: { type: String, required: true },
  C_description: String,
  C_educator: String,
  C_categories: [String],
  C_price: { type: Number, default: 0 },
  enrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
