
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const morgan = require('morgan');
var http = require( 'http' );
const userRoute = require( './routes/user' );
const merRoute = require('./routes/meritList')
require('./config/config')
var host = 'localhost';


let app = express();
app.options( '*', cors() );
app.use(morgan('dev'));
app.use( cors() );
app.use( bodyParser.json() );
app.use(
  bodyParser.urlencoded( {
    extended: false
  } )
);
app.use( '/', userRoute );
app.use('/mer',merRoute);

const port = process.env.PORT || 4003;

var server = http.createServer( app ).listen( port, function () { } );
console.log( '****************** SERVER STARTED ************************' );
console.log(
  '***************  Listening on: http://%s:%s  ******************',
  host,
  port
);
server.timeout = 240000;



const awaitHandler = fn => {
  return async ( req, res, next ) => {
    try {
      await fn( req, res, next );
    } catch ( err ) {
      next( err );
    }
  };
};

app.get('/', awaitHandler((req, res)=>{
  res.send("CAHU");
}))