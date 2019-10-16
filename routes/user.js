let express = require( 'express' )
let router = express.Router()
let nodemailer = require('nodemailer')

let { mongoose } = ( '../db/mongoose' );

let User = require( '../models/user' );
let { authenticate } = require( '../middleware/authentication' );
require( '../config/config' );

const awaitHandler = fn => {
    return async ( req, res, next ) => {
        try {
            res.setHeader( 'Content-Type', 'application/json; charset=utf-8' );
            await fn( req, res, next );
        } catch ( err ) {
            next( err );
        }
    };
};

router.post('/users/sendemail', awaitHandler( ( req, res ) => {
    let body = {
        email: req.body.email,
    }
    console.log(body.email + ": OTP = " +  body.OTP)
    //using nodemailer to send the otp to mail
    var transporter = nodemailer.createTransport( {
        host: "smtp.office365.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: 'admission@ifheindia.org',
            pass: process.env.EPASS
        }
    } );

    var mailOptions = {
      from: "admission@ifheindia.orge",
      to: body.email,
      subject: "Email",
      text: "EMAIL"
    };

    transporter.sendMail( mailOptions, function ( error, info ) {
        if ( error ) {
            console.log( error );
        } else {
            console.log( 'Email sent: ' + info.response );
        }
    } );
    //end of nodemailer
} ))

router.post( '/users/register', awaitHandler(async ( req, res ) => {
    if(tempUser.OTP != req.body.OTP){
        res.status( 401 ).end();
    } else{
        let body = {
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          ATIT: req.body.ATIT,
          father: req.body.father,
          mother: req.body.mother,
          DOB: req.body.DOB,
          address: req.body.address
        };
        let user = new User( body );
        user.save().then( () => {
            return user.generateAuthToken();
        } ).then( async ( token ) => {
            res.header( 'x-auth', token ).send( { user } );
        } ).catch( ( e ) => {
            console.log( e )
            res.status( 400 ).send( e );
        } )
    }
} ) );

router.post( '/users/login', awaitHandler( ( req, res ) => {
    let body = {
        email: req.body.email,
        password: req.body.password
    }

    User.findByCredentials( body.email, body.password ).then( ( user ) => {
        return user.generateAuthToken().then( ( token ) => {
            res.header( 'x-auth', token ).send( user );
        } );
    } ).catch( ( e ) => {
        res.status( 401 ).send();
    } );
} ) );

router.get( '/users/me', authenticate, awaitHandler( ( req, res ) => {
    res.send( req.user );
} ) );

router.delete( '/users/logout', authenticate, awaitHandler( ( req, res ) => {
    req.user.removeToken( req.token ).then( () => {
        res.status( 200 ).send();
    }, () => {
        res.status( 400 ).send();
    } );
} ) );

module.exports = router