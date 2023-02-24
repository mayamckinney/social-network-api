const router = require('express').Router();

const { getThoughtId,
        getAllThoughts,
        addThought,
        updateThought,
        removeThought,
        addReaction,
        deleteReaction
} = require('../../controllers/thought-controller');

// endpoint /api/thoughts
router.route('/')
    .get(getAllThoughts);

// endpoint /api/thoughts/thoughtId
router.route('/:thoughtId')
    .get(getThoughtId)
    .put(updateThought);

// endpoint /api/thoughts/userId to add a thought
router.route('/:userId')
    .post(addThought);

// endpoint /api/thoughts/userId/thoughtId
router.route('/:userId/:thoughtId')
    .delete(removeThought);

// endpoint /api/thoughts/thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction);

// endpoint /api/thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;
