const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./thought-routes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;