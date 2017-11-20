const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const logger     = require("morgan");
const express    = require('express');
const app        = express();
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
mongoose.set('debug', true);

require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));





