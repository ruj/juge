const CommandStructures = require('./structures/command');

module.exports = {
  RandomBooruPost: CommandStructures.RandomBooruPost,
  RandomNekoBotImage: CommandStructures.RandomNekoBotImage,
  RandomNekoDotLifeImage: CommandStructures.RandomNekoDotLifeImage,
  RandomRedditPost: CommandStructures.RandomRedditPost,

  CryptoUtils: require('./utils/CryptoUtils.js')
};