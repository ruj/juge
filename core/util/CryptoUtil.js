const crypto = require('crypto');

module.exports = {
  md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
  }
};