const router = require('express').Router();
const {
  getThoughts,
  createThought,
} = require('../../controllers/thoughtController');

//     /api/thoughts
// Get all thoughts and create new thought
router.route('/').get(getThoughts).post(createThought);

module.exports = router;
