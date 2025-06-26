import express from 'express';
import Course from '../models/Course.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/create', authMiddleware, async (req, res) => {
  try {
    if (!['teacher', 'admin'].includes(req.user.type)) {
      return res.status(403).json({ message: 'Only teachers or admins can create courses' });
    }

    const { C_title, C_description, C_educator, C_categories, C_price } = req.body;

    const newCourse = new Course({
      userID: req.user._id,
      C_title,
      C_description,
      C_educator,
      C_categories,
      C_price
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('enrolled', 'name email');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    if (course.userID.toString() !== req.user._id.toString() && req.user.type !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to delete this course' });
    }

    await course.deleteOne();
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error during delete' });
  }
});

router.put('/enroll/:id', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (!course.enrolled.includes(req.user._id)) {
      course.enrolled.push(req.user._id);
      await course.save();
    }

    res.json({ message: 'Enrolled successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
