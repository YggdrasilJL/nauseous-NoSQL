const router = require('express').Router();

router.use('/thoughts', require('./thoughtRoutes'));
router.use('/users', require('./userRoutes'));

module.exports = router;
