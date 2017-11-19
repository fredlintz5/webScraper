const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const logger     = require("morgan");
const Bikes      = require('./models/Bikes.js');
const scrapes    = require('./scrapes.js');
const express    = require('express');
const app        = express();
const path       = require("path");
const PORT       = process.env.PORT || 8080;
const db         = mongoose.connection;

//        DATABASE configuration for MONGOOSE 
const databaseUri = 'mongodb://localhost/webScraper';

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI)
} else {
	mongoose.connect(databaseUri);
}



db.on('error', (err) => console.log('Mongoose Error: ', err));
db.once('open', () => console.log('Mongoose connection successful'));


app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

mongoose.Promise = Promise;
// mongoose.connect('mongodb://localhost/webScraper', {
// 	useMongooseClient: true
// });


// static routes
app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname,'./public/html/index.html'));
})

app.get('/mountain', (req,res) => {
	res.sendFile(path.join(__dirname,'./public/html/mountain.html'));
})

app.get('/road', (req,res) => {
	res.sendFile(path.join(__dirname,'./public/html/road.html'));
})


// api routes
app.get('/api/mountain', (req,res) => {

	Bikes.find({category: 'mountain'})
		.then((data) => {
			if (data.length !== 0) {
				res.send(data);
			} else {

				scrapes.getMountainBikes((trekMountainBikes) => {
					Bikes
					.collection.insert(trekMountainBikes)
					.then((data) => {
						res.send(data.ops);
					})
					.catch((err) => {
						console.log(err);
					})
				});		
			}
		})
		.catch((err) => {
			console.log(err);
		})
})


app.get('/api/road', (req,res) => {

	Bikes.find({category: 'road'})
		.then((data) => {
			if (data.length !== 0) {
				res.send(data);
			} else {
				
				scrapes.getRoadBikes((trekRoadBikes) => {
					Bikes
					.collection.insert(trekRoadBikes)
					.then((data) => {
						res.send(data.ops);
					})
					.catch((err) => {
						console.log(err);
					})	
				});
			}
		})
		.catch((err) => {
			console.log(err);
		})
})




app.listen(PORT, () => console.log(`Listening on port ${PORT}`));








