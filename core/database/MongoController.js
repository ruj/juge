const transformProps = require('transform-props');
const castToString = (arg) => String(arg);

module.exports = {
	parse(entity) {
		return entity ? transformProps(entity.toObject({ versionKey: false }), castToString, '_id') : null;
	},

	add(model, entity) {
		return model.create(entity).then(this.parse);
	},

	findOne(model, id, projection) {
		return model.findById(id, projection).then(this.parse);
	},

	findAll(model, projection) {
		return model.find({}, projection).then((entity) => entity.map(this.parse));
	},

	get(model, id, projection) {
		return model.findOne(id, projection).then((entity) => entity || this.add(model, { _id: id }));
	},

	remove(model, id) {
		return model.findByIdAndRemove(id).then(this.parse);
	},

	update(model, id, entity, options = { upsert: true }) {
		return model.updateOne({ _id: id }, entity, options);
	}
};