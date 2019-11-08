let express = require( 'express' )
let router = express.Router()

let list = require('../models/merList')

router.get('/makeAlloc',(req,res)=>{
    let allocStats = {
        CSE: 50,
        ECE: 40,
        EEE: 40,
        CIVIL: 40,
        ME: 30
    }
    let allocated = []
    let q1 = []
    let q2 = []
    let q3 = []
    list.findOne()
    .then(res=>{
        q1 = res.meritList
        let i = 0
        q1.map((cand,ind)=>{
            if(allocStats[cand.preference]===0){
                    if(allocStats[cand.pref2]>0){
                        allocated.push(cand)
                        q2.push(cand)
                        allocStats[cand.pref2]--
                    }
                    else if(allocStats[cand.pref2]===0){
                        if(allocStats[cand.pref3]>0){
                            allocated.push(cand)
                            q2.push(cand)
                            allocStats[cand.pref3]--
                        }
                        else{
                        q2.push(cand)
                        }
                    }
                }
                else if(allocStats[cand.preference]>0){
                    allocated.push(cand)
                    allocStats[cand.preference]--
                }
        })
        console.log("Total allocated" + allocated.length)
        console.log("CSE:" + allocStats.CSE)
        console.log("ECE:" + allocStats.ECE)
        console.log("EEE:" + allocStats.EEE)
        console.log("Mech:" + allocStats.ME)
        console.log("CIVIL:" + allocStats.CIVIL)
        console.log("Total in waiting list" + (q2.length))
    })
    .catch(err=>console.log(err))
})

module.exports = router