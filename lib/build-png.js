const fs = require('fs');
var async = require("async");
var svg2png = require("svg2png");

module.exports = function (sprite, callback) {

	var tasks = sprite.sizes.map(function (size) {
		return function (callback) {
			fs.readFile(sprite.svgPath, (err, sourceBuffer) => {
				if (err) {
					throw err;
				}
				svg2png(sourceBuffer, { width: size.width, height: size.height })
					.then(buffer => fs.writeFile(size.pngPath, buffer, (err) => {
						if (err) {
							throw err;
						}
						callback();
					 }))
					.catch(e => console.error(e));
			});
		};
	});
	
	async.parallel(tasks, callback);
	
};