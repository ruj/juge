const Jimp = require('jimp');

module.exports = {
  async composite(image, composition, {
    size = [0, 0],
    position = [0, 0]
  } = {}) {
    const [baseImage, compositionImage] = await this.read([image, composition]);

    baseImage.resize(...size);
    baseImage.composite(compositionImage, ...position);

    return baseImage.getBufferAsync(Jimp.MIME_PNG);
  },

  read(images) {
    return Promise.all(images.map((image) => {
      return new Promise((resolve) => {
        return Jimp.read(image)
          .then((image) => resolve(image));
      });
    }));
  }
};