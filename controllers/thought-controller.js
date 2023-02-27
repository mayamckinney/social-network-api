const { Thought, User } = require('../models');

module.exports = {
    //get thought by id
    getThoughtId({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'There was no thought found with this id.' });
                    return;
                }
                res.json(thoughtData);
            }) .catch (err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getAllThoughts(req, res) {
        Thought.find({}).then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // allow user to add thought
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate({ _id: params.userId }, { $push: { thoughts: _id } }, { new: true });
            }) .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'There was no user found with this id.' });
                    return;
                }
                res.json(userData);
            }) .catch(err => res.json(err));
    },
    // edit/update a thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ id: params.thoughtId }, body, { new: true, runValidation: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'There was no thought found with this id.' });
                    return;
                }
                res.json(thoughtData);
            }) .catch(err => res.status(400).json(err));
    },
    // remove a thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'There was no thought found with this id.' });
                    return;
                }
                return User.findOneAndUpdate({ _id: params.userId }, { $pull: { thoughts: params.thoughtId } }, { new: true });
            }) .then (userData => {
                if (!userData) {
                    res.status(404).json({ message: 'There was no user found with this id. '});
                    return;
                }
                res.json(userData);
            }) .catch(err => res.json(err));
    },
    // add a reaction to thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $addToSet: { reactions: body } }, { new: true, runValidators: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'There was no thought found with this id.' });
                    return;
                }
                res.json(thoughtData);
            }) .catch(err => res.json(err));
    },
    // delete a reaction on a thought
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: { reactionId: params.reactionId } } }, { new: true, runValidators: true })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'There was no thought found with this id.' });
                return;
            }
            res.json(thoughtData);
        }) .catch(err => res.json(err));
    }
};

