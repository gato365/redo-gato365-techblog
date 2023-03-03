const router = require('express').Router();
const { User } = require('../../models');

// Get all users
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


// Get 1 user
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

// Create a new user
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

// Login route for existing users
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

// Logout route for existing users
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