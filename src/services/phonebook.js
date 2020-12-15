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
    logger.error("addPhoneBook::error", error.message);
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
              },
              {
                new: true,
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
      data,
      {
        new: true,
      }
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
    logger.error("updatePhoneBook::error", error.message);
    throw error;
  }
};