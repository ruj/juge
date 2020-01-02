const CommandStructures = require('./structures/command');

module.exports = {
  RandomBooruPost: CommandStructures.RandomBooruPost,
  RandomNekoBotImage: CommandStructures.RandomNekoBotImage,
  RandomNekoDotLifeImage: CommandStructures.RandomNekoDotLifeImage,
  RandomRedditPost: CommandStructures.RandomRedditPost,

  CryptoUtil: require('./util/CryptoUtil.js')
};