const router = require('express').Router();

// const apiRoutes = require('./api');
// const afterLoginRoutes = require('./afterLoginRoutes');
const beforeLoginRoutes = require('./beforeLoginRoutes');

router.use('/', beforeLoginRoutes);
// router.use('/dashboard', afterLoginRoutes);
// router.use('/api', apiRoutes);

module.exports = router;