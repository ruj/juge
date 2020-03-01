const Jimp = require('jimp');
const { resolve } = require('path');
const { parse } = require('url');

const assetsDirectory = resolve(__dirname, '..', 'assets');

module.exports = {
  async composite(image, composition, {
    size = [0, 0],
    position = [0, 0]
  } = {}) {
    composition = !parse(composition).slashes ? resolve(assetsDirectory, composition) : composition;

    const [baseImage, compositionImage] = await this.read([image, composition]);

    size = !isNaN(size) ? [size, Jimp.AUTO] : size;

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