require('dotenv').config();

module.exports = config = {
  mongoConnection: 'mongodb+srv://use-chalkboard:use-chalkboard@cluster0-g3vvd.mongodb.net/use-chalkboard?retryWrites=true&w=majority',
  mongoTestConnection: 'mongodb+srv://use-chalkboard:use-chalkboard@cluster0-g3vvd.mongodb.net/use-chalkboard-test?retryWrites=true&w=majority',
  secret: 'usechalkboardjwtsecret'
}