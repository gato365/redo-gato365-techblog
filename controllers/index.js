const router = require('express').Router();

const apiRoutes = require('./api');
const beforeLoginRoutes = require('./beforeLoginRoutes');
// const afterLoginRoutes = require('./afterLoginRoutes');



router.use('/api', apiRoutes);
router.use('/', beforeLoginRoutes);
// router.use('/dashboard', afterLoginRoutes);


module.exports = router;