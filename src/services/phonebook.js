const mongoose = require("mongoose");

const PhoneBook = require("../models/phonebook");
const PhoneNumber = require("../models/phonenumber");

const logger = require("../lib/logger");

/**
 * Creates phonebook and saves it to the database
 * @param data - Object
 * @param userId - String
 * @returns String
 */
exports.addPhoneBook = async (data, userId) => {
  try {
    let phoneNumberIds = await data.phone_numbers.reduce(async (acc, curr) => {
      const phoneNumber = new PhoneNumber({
        tag: curr.tag,
        number: curr.number,
      });
      await phoneNumber.save();
      return [...(await acc), phoneNumber._id];
    }, []);

    let newPhoneBook = new PhoneBook({
      user: userId,
      name: data.name,
      phone_numbers: phoneNumberIds,
      email: data.email,
      mailing_address: data.mailing_address,
    });

    const response = await newPhoneBook.save();

    if (!response) {
      let error = new Error("Phonebook not saved.");
      error.statusCode = 500;
      throw error;
    }

    return response;
  } catch (error) {
    logger.error("Service::addPhoneBook::error", error.message);
    throw error;
  }
};

/**
 * Updates phonebook record
 * @param data - Object
 * @param id - String
 * @returns String
 */
exports.updatePhoneBook = async (data, id) => {
  try {   
    const phoneBook = await PhoneBook.findOne({
      _id: mongoose.Types.ObjectId(id),
    })
      .select("-__v")
      .populate({ path: "phone_numbers", select: "tag number" });

    if (!phoneBook) {
      let error = new Error("Phonebook not found.");
      error.statusCode = 404;
      throw error;
    }

    let updatedPhoneNumbers = [];

    if (phoneBook.phone_numbers.length > 0  && data.phone_numbers) {
      let sortedNumberObject = {};

      phoneBook.phone_numbers.map((number) => {
        let tag = number.tag;
        sortedNumberObject = { ...sortedNumberObject, [tag]: number._id };
      });


      updatedPhoneNumbers = await data.phone_numbers.reduce(
        async (acc, curr) => {
          const tag = curr.tag;

          if (sortedNumberObject[tag]) {
            await PhoneNumber.updateOne(
              {
                _id: mongoose.Types.ObjectId(sortedNumberObject[tag]),
                tag,
              },
              {
                number: curr.number,
              }
            );
            return;
          }

          const phoneNumber = new PhoneNumber({
            tag: curr.tag,
            number: curr.number,
          });
          await phoneNumber.save();
          return (await acc) ? [...acc, phoneNumber._id] : [phoneNumber._id];
        },
        []
      );
      delete data.phone_numbers;
    }

    await PhoneBook.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      data
    );

    updatedPhoneNumbers && phoneBook.phone_numbers.push(updatedPhoneNumbers);

    const response = await phoneBook.save();

    if (!response) {
      let error = new Error("Phonebook not updated.");
      error.statusCode = 500;
      throw error;
    }

    return "Phonebook updated succesfully.";
  } catch (error) {
    logger.error("Service::updatePhoneBook::error", error.message);
    throw error;
  }
};

/**
 * Fetches aray of phonebooks from the database
 * @param perPage - String
 * @param page - String
 * @param sort - String
 * @param userId - String
 * @returns Object
 */
exports.getPhoneBook = async ({ perPage, page, sort }, userId) => {
  try {
    const currentPage = parseInt(page, 10) || 1;
    const contactsPerPage = parseInt(perPage, 10) || 10;

    const totalData = await PhoneBook.countDocuments({
      user: mongoose.Types.ObjectId(userId),
    });

    const Phonebooks = await PhoneBook.find({
      user: mongoose.Types.ObjectId(userId),
    })
      .select("-__v")
      .populate({ path: "phone_numbers", select: "tag number" })
      .skip((currentPage - 1) * contactsPerPage)
      .limit(contactsPerPage)
      .sort({ name: sort });

    return {
      currentPage,
      pages: Math.ceil(totalData / perPage),
      totalData,
      phoneBooks: Phonebooks,
    };
  } catch (error) {
    logger.error("Service::getPhoneBook::error", error.message);
    throw error;
  }
};

/**
 * Deletes a phonebook record from the database
 * @param id - String
 * @returns String
 */
exports.deletePhoneBook = async (id) => {
  try {
    const phonebook = await PhoneBook.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    if (!phonebook) {
      let error = new Error("Phonebook not found.");
      error.statusCode = 404;
      throw error;
    }

    for (let id of phonebook.phone_numbers) {
      await PhoneNumber.deleteOne({
        _id: mongoose.Types.ObjectId(id),
      });
    }

    const response = await PhoneBook.deleteOne({
      _id: mongoose.Types.ObjectId(id),
    });

    if (response.deletedCount === 0) {
      let error = new Error("Phonebook not deleted.");
      error.statusCode = 500;
      throw error;
    }

    return "Phonebook deleted.";
  } catch (error) {
    logger.error("Service::deletePhoneBook::error", error.message);
    throw error;
  }
};