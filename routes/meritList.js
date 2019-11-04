let readXlsxFile = require("read-excel-file/node");
let express = require("express");
let router = express.Router();
let url = require("url");

let list = require("../models/merList");
let atitModel = require("../models/atit");
let userModel = require("../models/user");

router.post("/atitScoresAndUser", async (req, res) => {
  try {
    userModel.collection.drop();
    atitModel.collection.drop();
    let atitScores = [];
    let userData = [];
    console.log("starting reading file");
    let fileData = await readXlsxFile("./assets/ATIT Students Results.xlsx");
    console.log("Done reading file");
    let userTemp = {};
    let atitTemp = {};
    for (let i = 1; i < fileData.length; i++) {
      atitTemp = {};
      userTemp = {};
      userTemp = {
        registrationNumber: fileData[i][0],
        email: fileData[i][7],
        password: fileData[i][5],
        Name: fileData[i][5],
        phone: fileData[i][13]
      };
      atitTemp = {
        maths: fileData[i][14],
        physics: fileData[i][17],
        english: fileData[i][23],
        logical: fileData[i][20],
        totalScore: fileData[i][17],
        email: fileData[i][7],
        preference: fileData[i][39],
        preference2: fileData[i][40],
        preference3: fileData[i][41]
      };
      userData.push(userTemp)
      atitScores.push(atitTemp);
    }
    console.log("started inserting into database");
    let response1 = await userModel.create(userData);
    let response2 = await atitModel.insertMany(atitScores);
    console.log("done adding into database");
    res.send({ response1, response2 });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

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
                "preference": rows[i][39],
                "pref2": rows[i][40],
                "pref3": rows[i][41]

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
module.exports = router;
