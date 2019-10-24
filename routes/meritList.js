let readXlsxFile = require('read-excel-file/node');
let express = require( 'express' )
let router = express.Router()

// let User = require( '../models/user' );
// let { authenticate } = require( '../middleware/authentication' );
// require( '../config/config' );

// const awaitHandler = fn => {
//     return async ( req, res, next ) => {
//         try {
//             res.setHeader( 'Content-Type', 'application/json; charset=utf-8' );
//             await fn( req, res, next );
//         } catch ( err ) {
//             next( err );
//         }
//     };
// };



router.get('/prepMerit',(req,res)=>{
    let merList = []
    readXlsxFile('./assets/ATIT Students Results.xlsx').then(rows=>{
        for(let i=1;i<2394;i++){
            merList.push({
                "Name": rows[i][5],
                "Score": rows[i][17]
            })
        }
        merList.sort((a, b) =>{
            return a.Score<b.Score
        })
        console.log(merList)
    }).catch(err=>console.log(err))

})

module.exports = router
