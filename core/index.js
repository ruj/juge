const CommandStructures = require('./structures/command');

module.exports = {
  RandomBooruPost: CommandStructures.RandomBooruPost,
  RandomNekoBotImage: CommandStructures.RandomNekoBotImage,
  RandomNekoDotLifeImage: CommandStructures.RandomNekoDotLifeImage,
  RandomRedditPost: CommandStructures.RandomRedditPost,

  Route: require('./structures/Route.js'),

  CryptoUtils: require('./utils/CryptoUtils.js'),
  DiscordUtils: require('./utils/DiscordUtils.js'),
  FileUtils: require('./utils/FileUtils.js'),
  JimpUtils: require('./utils/JimpUtils.js')
};