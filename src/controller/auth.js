const authService = require('../services/auth');

exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const result = await authService.createUser(body);

    if (!result) {
      let error = new Error('');
      error.statusCode = 400;
      throw error;
    }

    res.json({
      error: false,
      message: 'User created.'
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

exports.authenticateUser = async (req, res, next) => {
  try {
    const { body } = req;

    const data = await authService.authenticateUser(body);
    
    res.json({
      error: false,
      message: 'User authenticated',
      data
    })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}