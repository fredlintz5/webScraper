const path = require('path');


module.exports = (app) => {
	// static routes
	app.get('/', (req,res) => {
		res.sendFile(path.join(__dirname,'../public/html/index.html'));
	})

	app.get('/mountain', (req,res) => {
		res.sendFile(path.join(__dirname,'../public/html/mountain.html'));
	})

	app.get('/road', (req,res) => {
		res.sendFile(path.join(__dirname,'../public/html/road.html'));
	})
};