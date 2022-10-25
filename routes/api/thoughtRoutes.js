const router = require('express').Router();
const {
  getThoughts,
  createThought,
  getSingleThought,
  //   updateThought,
  //   deleteThought,
} = require('../../controllers/thoughtController');

//     /api/thoughts
// Get all thoughts and create new thought
router.route('/').get(getThoughts).post(createThought);

// Get a single thought by ID
router.route('/:thoughtId').get(getSingleThought);
//   .put(updateThought)
//   .delete(deleteThought);

module.exports = router;
