const router = require('express').Router();
const {
  getThoughts,
  createThought,
  getSingleThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

//     /api/thoughts
// Get all thoughts and create new thought
router.route('/').get(getThoughts).post(createThought);

// Get/update/delete a single thought by ID
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// Post reactions
router.route('/:thoughtId/reactions').post(createReaction);

// Delete reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
