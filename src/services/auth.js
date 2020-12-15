const bcrypt = require("bcryptjs"); 
const jwt = require('jsonwebtoken');
const Auth = require("../models/auth");

const config = require("../config/config")
const logger = require("../lib/logger");

/**
 * Creates User
 * @param email
 * @param password
 * @returns message - String
 */
exports.createUser = async ({email, password}) => {
    try {
        const formattedEmail = email.toLowerCase().trim();
        const user = await Auth.findOne({email: formattedEmail});

        if (user) {
            let error = new Error("Email already exists.");
            error.statusCode = 400;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new Auth({
            email: formattedEmail,
            password: hashedPassword
        });

        const response = await newUser.save();

        if (!response) {
            let error = new Error("User not created.");
            error.statusCode = 501;
            throw error;
        }

        return 'User created.';
      
    } catch (error) {
      logger.error("Service::createUser::error", error.message);
      throw error;
    }
  };


/**
 * Authenticates user
 * @param email
 * @param password
 * @returns token - String
 */
exports.authenticateUser = async ({email, password}) => {
    try {
        const formattedEmail = email.toLowerCase().trim();
        const user = await Auth.findOne({email: formattedEmail});

        if (!user) {
            let error = new Error("User does not exist.");
            error.statusCode = 401;
            throw error;
        }

        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
          const error = new Error("Wrong password.");
          error.statusCode = 401;
          throw error;
        }
  
        const token = jwt.sign(
          {
            userId: user._id
          },
          config.secret,
          {
            expiresIn: "3h",
          }
        );
  
        if (!token) {
          const error = new Error("Error occured, could not create token.");
          throw error;
        }
  
        return token;
      
    } catch (error) {
      logger.error("Service::authenticateUser::error", error.message);
      throw error;
    }
  };