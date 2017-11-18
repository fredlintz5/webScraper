const bodyParser = require('body-parser');
const cheerio    = require('cheerio');
const request    = require('request');
const mongoose   = require('mongoose');
const logger     = require("morgan");
const Bikes         = require('./models/Bikes.js');
const express    = require('express');
const app        = express();
const PORT       = process.env.PORT || 8080;


app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/webScraper', {
	useMongooseClient: true
});
    


app.get('/mountain', (req,res) => {

	Bikes.find({category: 'mountain'})
		.then((data) => {
			if (data.length !== 0) {
				res.json(data);
			} else {

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

					Bikes
						.collection.insert(trekMountainBikes)
						.then((data) => {
							res.send(data.ops);

						})
						.catch((err) => {
							console.log(err);
						})
				})
			}
		})
})


app.get('/road', (req,res) => {

	Bikes.find({category: 'road'})
		.then((data) => {
			if (data.length !== 0) {
				res.json(data);
			} else {
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
					Bikes
						.collection.insert(trekRoadBikes)
						.then((data) => {
							res.send(data.ops);
						})
						.catch((err) => {
							console.log(err);
						})		
				})
			}
		})
})




app.listen(PORT, () => console.log(`Listening on port ${PORT}`));








