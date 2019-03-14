let t = {};

t.linkify = (text) => {
	let REGEX = '^https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:jpg|png)$';
	return text.replace(REGEX, (url) => {
		return url;
	});
}

t.arrayDiff = (first, second) => {
	let a = [], diff = [];
	for (var i = 0; i < first.length; i++) {
		a[first[i]] = true;
	}
	for (var i = 0; i < second.length; i++) {
		if (a[second[i]]) {
			delete a[second[i]];
		} else {
			a[second[i]] = true;
		}
	}
	for (var r in a) {
		diff.push(r);
	}
	return diff;
}

t.checkId = (id) => {
	return /^[0-9]{18}$/.test(id);
}

t.checkRegion = (region) => {
	let regions = {
		'brazil': 'Brazil',
		'eu-central': 'Central Europe',
		'hongkong': 'Hong Kong',
		'japan': 'Japan',
		'russia': 'Russia',
		'singapore': 'Singapore',
		'southafrica': 'Sounth Africa',
		'sydney': 'Sydney',
		'us-central': 'U.S. Central',
		'us-east': 'U.S. East',
		'us-south': 'U.S. South',
		'us-west': 'U.S. West',
		'eu-west': 'Europe Western' };
	return regions[region];
}

t.checkDays = (date) => {
	let now = new Date();
	let diff = now.getTime() - date.getTime();
	let days = Math.floor(diff / 86400000);
	return days + (days == 1 ? ' day' : ' days');
}

t.randomItem = (item) => {
	return item[Math.floor(Math.random() * item.length)];
}

t.randomRange = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

t.firstLowerCase = (text, split = ' ') => {
	return text.split(split).map((word) => `${word.charAt(0).toLowerCase()}${word.slice(1)}`).join(' ');
}

t.hash = (length) => {
	return Array(!length ? 18 : length + 1).join((Math.random().toString(36) + '00000000000000000').slice(2, !length ? 18 : length)).slice(0, !length ? 18 : length);
}

module.exports = t;