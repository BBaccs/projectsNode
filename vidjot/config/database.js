if (process.env.NODE_ENV === 'production') {
  module.exports = {mongoURI: 'mongodb+srv://bbaccs:LFuW7cyP-R9Z-ay@bbaccs-6btlc.mongodb.net/test?retryWrites=true&w=majority'}
} else {
  module.exports = {mongoURI: 'mongodb://localhost/vidjot-dev'}
}