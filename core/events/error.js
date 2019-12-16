module.exports = (Juge, error) => {
  Juge.log(error.message, { tags: ['error'], color: 'red' });
};