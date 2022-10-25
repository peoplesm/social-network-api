const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

//     /api/users
// Get all users and create new user
router.route('/').get(getUsers).post(createUser);

// Get/update/delete user by _id
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// Add and delete friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
