
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const morgan = require('morgan');
let { mongoose } = require( './db/mongoose' );
// const db = require('./config/keys').mongoURI
var http = require( 'http' );
const userRoute = require( './routes/user' );
const merRoute = require('./routes/meritList')
const allocRoute = require('./routes/alloc')
const deptRoute = require("./routes/department");
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
// mongoose.connect(db,{
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(res=>console.log('MongoDB Connected'))
// .catch(err=>console.log(err))
app.use( '/', userRoute );
app.use('/mer',merRoute);
app.use('/alloc',allocRoute)
app.use('/dept', deptRoute)

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