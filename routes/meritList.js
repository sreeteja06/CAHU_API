let readXlsxFile = require('read-excel-file/node');
let express = require( 'express' )
let router = express.Router()

 let list = require( '../models/merList' );

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
        let mer = new list(merList)
        mer.save().then(res=>console.log(res))
        .catch(err=>console.log(err))
        console.log(merList)
    }).catch(err=>console.log(err))

})

module.exports = router
