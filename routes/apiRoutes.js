const Bikes      = require('../models/Bikes.js');
const scrapes    = require('../scrapes.js');
var ObjectId     = require('mongodb').ObjectID;


module.exports = (app) => {
	
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

	app.put('/api/mountain/:rating/:id', (req,res) => {
		
		Bikes.update(
		   { _id: ObjectId(req.params.id) },
		   { $push: {rating: req.params.rating }})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			console.log(err);
		})
	})

	app.put('/api/road/:rating/:id', (req,res) => {

		Bikes.update(
		   { _id: ObjectId(req.params.id) },
		   { $push: {rating: req.params.rating }})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			console.log(err);
		})
	})

};