module.exports = (client, error) => {
  client.log(error.message, { tags: ['error'], color: 'red' });
};