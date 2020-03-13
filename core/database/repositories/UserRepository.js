const MongoRepository = require('../MongoRepository.js');
const User = require('../schemas/UserSchema.js');

module.exports = {
  add(user) {
    return MongoRepository.add(User, {
      _id: user.id
    });
  },

  findOne(id, projection) {
    return MongoRepository.findOne(User, id, projection);
  },

  findAll(projection) {
    return MongoRepository.findAll(User, projection);
  },

  get(id, projection) {
    return MongoRepository.get(User, id, projection);
  },

  remove(id) {
    return MongoRepository.remove(User, id);
  },

  update(id, entity) {
    return MongoRepository.update(User, id, entity);
  }
};