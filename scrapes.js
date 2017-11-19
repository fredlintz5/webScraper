const cheerio = require('cheerio');
const request = require('request');



let scrapers = {
	getMountainBikes: function(cb) {
		request("https://www.trekbikes.com/us/en_US/bikes/mountain-bikes/c/B300/", (err, response, html) => {

			if (err) throw err;

			let $ = cheerio.load(html);
			let trekMountainBikes = [];

			$('.product-tile__wrap').each((i, element) => {
				
				let link = $(element).find('a').attr('href');
				let text = $(element).find('a').attr('title');
				let image = $(element).find('.product-tile__image-wrap').find('img').attr('data-src');
				let price = $(element).find('.product-tile__price').find('span').text();

				if (image !== null && image !== undefined && image !== "") {
					trekMountainBikes.push({
						link: link,
						text: text,
						image: image,
						price: price,
						category: 'mountain'
					});
				}
			})
			cb(trekMountainBikes);
		})
	},

	getRoadBikes: function(cb) {
		request("https://www.trekbikes.com/us/en_US/bikes/road-bikes/c/B200/", (err, response, html) => {

			if (err) throw err;

			let $ = cheerio.load(html);
			let trekRoadBikes = [];

			$('.product-tile__wrap').each((i, element) => {
				
				let link = $(element).find('a').attr('href');
				let text = $(element).find('a').attr('title');
				let image = $(element).find('.product-tile__image-wrap').find('img').attr('data-src');
				let price = $(element).find('.product-tile__price').find('span').text();

				if (image !== null && image !== undefined && image !== "") {
					trekRoadBikes.push({
						link: link,
						text: text,
						image: image,
						price: price,
						category: 'road'
					});
				}
			})
			cb(trekRoadBikes);
		})
	}
};


module.exports = scrapers;
