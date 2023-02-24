const router = require('express').Router();

const { getUserId,
        getAllUsers,
        createUser,
        updateUser,
        deleteUser,
        addFriend,
        deleteFriend } = require('../../controllers/user-controller');

// endpoint /api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// endpoint /api/users/:id
router.route('/:id')
    .get(getUserId)
    .put(updateUser)
    .delete(deleteUser);

// endpoint /api/users/:userId/friends/:friendId
router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;