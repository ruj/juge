const crypto = require('crypto');

module.exports = {
  base64(string) {
    return Buffer.from(string).toString('base64');
  },

  md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
  }
};