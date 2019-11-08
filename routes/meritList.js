let readXlsxFile = require('read-excel-file/node');
let express = require( 'express' )
let router = express.Router()
let url = require('url')

let list = require( '../models/merList' );

router.get('/prepMerit',(req,res)=>{
    let merList = []
    readXlsxFile('./assets/ATIT Students Results.xlsx').then(rows=>{
        for(let i=1;i<2394;i++){
            merList.push({
                "maths": rows[i][14],
                "physics": rows[i][17],
                "logical": rows[i][20],
                "english": rows[i][23],
                "totalScore": rows[i][17],
                "name": rows[i][5],
                "preference": rows[i][38],
                "pref2": rows[i][39],
                "pref3": rows[i][40]

            })
        }
        let mer = new list({
            meritList: merList
        })
        mer.save()
        .then(li=>{
            console.log(li)
        })
        .catch(err=>console.log(err))
    }).catch(err=>console.log(err))

})
module.exports = router
