let readXlsxFile = require("read-excel-file/node");
let express = require("express");
let router = express.Router();
let url = require("url");
let { mongoose } = require("../db/mongoose");

let list = require("../models/merList");
let atitModel = require("../models/atit");
let userModel = require("../models/user");
let departModel = require("../models/departments");

router.post("/atitScoresAndUser", async (req, res) => {
  try {
    // userModel.collection.drop();
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
        name: fileData[i][5],
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
      userData.push(userTemp);
      atitScores.push(atitTemp);
    }
    console.log("started inserting into database");
    // let response1 = await userModel.create(userData);
    let response2 = await atitModel.insertMany(atitScores);
    console.log("done adding into database");
    console.time("done filtering");
    let response = await atitModel
      .find({ eligible: true })
      .sort([["totalScore", -1], ["maths", -1], ["physics", -1]]);
    console.timeEnd("done filtering");
    // let depts = [{
    //     DeptName: "CSE",
    //     DeptSeats: 5,
    //     allocated: 0,
    // }]
    let depts = await departModel.find({ DeptYear: req.body.deptYear });
    for (let i = 0; i < depts.length; i++) {
      depts[i].allocated = 0;
    }
    console.time("allocation");
    for (let i = 0; i < response.length; i++) {
      let department = depts.findIndex(obj => {
        return obj.DeptName === response[i].preference;
      });
      if (
        department === -1 ||
        depts[department].allocated === depts[department].DeptSeats
      ) {
        let department2 = depts.findIndex(obj => {
          return obj.DeptName === response[i].preference2;
        });
        if (
          department2 === -1 ||
          depts[department2].allocated === depts[department2].DeptSeats
        ) {
          let department3 = depts.findIndex(obj => {
            return obj.DeptName === response[i].preference2;
          });
          if (
            department3 === -1 ||
            depts[department3].allocated === depts[department3].DeptSeats
          ) {
            let temp = { ...response[i]._doc };
            response[i] = { ...temp, allocated: "None" };
          } else {
            response[i].allocated = depts[department3].DeptName;
            ++depts[department3].allocated;
          }
        } else {
            response[i].allocated = depts[department2].DeptName;          
          ++depts[department2].allocated;
        }
      } else {
        response[i].allocated = depts[department].DeptName;
        ++depts[department].allocated;
      }
    }
    console.timeEnd("allocation");
    await atitModel.collection.drop();
    await departModel.collection.drop();
    await departModel.insertMany(depts);
    await atitModel.insertMany(response);
    res.send(response);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/getAllocations", async (req, res) => {
  try {
    console.time("done filtering");
    let response = await atitModel
      .find()
      .sort([["totalScore", -1], ["maths", -1], ["physics", -1]]);;
    res.send(response);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/prepMerit", (req, res) => {
  let merList = [];
  readXlsxFile("./assets/ATIT Students Results.xlsx")
    .then(rows => {
      for (let i = 1; i < 2394; i++) {
        merList.push({
          maths: rows[i][14],
          physics: rows[i][17],
          logical: rows[i][20],
          english: rows[i][23],
          totalScore: rows[i][17],
          name: rows[i][5],
          preference: rows[i][39],
          pref2: rows[i][40],
          pref3: rows[i][41]
        });
      }
      let mer = new list({
        meritList: merList
      });
      mer
        .save()
        .then(li => {
          console.log(li);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});
module.exports = router;
