const router = require('express').Router();
const { User } = require('../../models');

// @DESC Get all users
// @ROUTE GET /api/users
// @ACCESS Public
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll(
      {
        attributes: {
          // Exclude the password from the response
          exclude: ['password']
        }
      }
    );
    // This will return all users
    res.status(200).json(userData);
  } catch (err) {
    // This will return an error message
    res.status(500).json(err);
  }
});


// @DESC Get 1 user
// @ROUTE GET /api/users/:id
// @ACCESS Public
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne(
      {
        where: {
          id: req.params.id
        },
        attributes: {
          // Exclude the password from the response
          exclude: ['password']
        }
      });

    // This will return 1 user
    res.status(200).json(userData);
  } catch (err) {
    // This will return an error message
    res.status(500).json(err);
  }

});

// @DESC Create a new user
// @ROUTE POST /api/users
// @ACCESS Public
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// @DESC Login route for existing users
// @ROUTE POST /api/users/login
// @ACCESS Public
router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({
      where: { email: req.body.email }
    });



    // If no user is found, respond with an error message (Wrong email or password)
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again9' });
      return;
    }


    // Validate the password
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is incorrect, respond with an error message (Wrong email or password)
    if (!validPassword) {
      res
        .status(404)
        .json({ message: 'Incorrect email or password, please try again8' });
      return;
    }

    // If the user is found and the password is correct, log the user in and respond with a success message
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// @DESC Logout route for existing users
// @ROUTE POST /api/users/logout
// @ACCESS Public
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;