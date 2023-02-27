const { User } = require('../models');

module.exports = {
    getUserId({ params }, res) {
        // find user by id
        User.findOne({ _id: params.id })
            .populate('friendsList')
            .populate('thoughtsList')
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'There was no user found with that id.'});
                    return;
                }
                res.json(userData);
            }) .catch (err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    // return all users
    getAllUsers(req, res) {
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // create new user
    createUser({ body }, res) {
        User.create(body)
        .then(userData => res.json(userData))
        .catch((err) => res.status(400).json(err));
    },
    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { runValidators: true, new: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'There was no user found with this id. '});
                    return;
                }
                res.json(userData);
            }) .catch (err => res.status(400).json(err));
    },
    // delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'There was no used found with this id. '});
                    return;
                }
            }) .then(() => {
                res.json({ message: 'This user has been deleted!' });
            }) .catch(err => res.status(400).json(err));
    },
    // user to add other user as friend
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { runValidators: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'There was no user found with this id. '});
                    return;
                }
                res.json(userData);
            }) .catch(err => res.status(400).json(err));
    },
    // delete a friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { runValidators: true })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'There was no user found with this id. '});
                return;
            }
            res.json(userData);
        }) .catch(err => res.status(400).json(err));
    }
};
