let Papa = require('papaparse')
let file = require('../assets/atit.csv')
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

var merList = []

router.get('/prepMerit',(req,res)=>{
    Papa.parse('../assets/atit.csv',{
        download: true,
        complete: results=>{
            for(let i=1;i<results.data.length;i++){
                merList.push({
                    "Name": results.data[i][2],
                    "Score": results.data[i][4],
                    "Phy_score": results.data[i][6],
                    "Chem_score": results.data[i][9],
                    "Eng_score": results.data[i][12],
                    "Log_score": results.data[i][15],
                    "Math_score": results.data[i][18]
                })
            }
        }
    })
    merList.sort((a,b)=>{
        let keyA = a.Score,
            keyB = a.Score;
        // Compare the scores of 2 candidates
        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
    });
    console.log(merList)

})

module.exports = router
