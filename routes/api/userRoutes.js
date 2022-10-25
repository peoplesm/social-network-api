const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  // updateUser,
  deleteUser,
} = require('../../controllers/userController');

//     /api/users
// Get all users and create new user
router.route('/').get(getUsers).post(createUser);

//    /api/users/:userId
// Get/update/delete user by _id
router.route('/:userId').get(getSingleUser).delete(deleteUser);

module.exports = router;
