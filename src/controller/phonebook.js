const phoneBookService = require("../services/phonebook");

exports.addPhoneBook = async (req, res, next) => {
  try {
    const { body, userId } = req;

    const result = await phoneBookService.addPhoneBook(body, userId);

    if (!result) {
      let error = new Error("Phonebook not saved.");
      error.statusCode = 500;
      throw error;
    }

    res.json({
      error: false,
      message: "Phonebook created.",
      data: result,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updatePhoneBook = async (req, res, next) => {
  try {
    const { body, params } = req;
    const { id } = params;

    const result = await phoneBookService.updatePhoneBook(body, id);

    if (!result) {
      let error = new Error("Phonebook not updated.");
      error.statusCode = 500;
      throw error;
    }

    res.json({
      error: false,
      message: "Phonebook updated.",
      data: result,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getPhoneBook = async (req, res, next) => {
  try {
    const { userId } = req;
    const { perPage, page, sort } = req.query;

    const result = await phoneBookService.getPhoneBook(
      { perPage, page, sort },
      userId
    );

    res.json({
      error: false,
      message: "Phonebook Fetched Successfully.",
      data: result,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deletePhoneBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await phoneBookService.deletePhoneBook(id);

    res.json({
      error: false,
      message: data,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
