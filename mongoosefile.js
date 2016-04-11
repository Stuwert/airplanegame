require('dotenv').load()

module.exports = {
  development :  'mongodb://localhost/aviator',
  production :  process.env.DATABASE_URL + '?ssl=true'
}
