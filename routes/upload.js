let express = require("express");
let fileUpload = require("express-fileupload")
let router = express.Router();

router.use(fileUpload())

router.post('/upload',(req,res)=>{
    if(req.files===null){
        return res.status(400).json("No file")
    }
    const file = req.files.file
    console.log("Inside uplaod")

    file.mv(`./assets/${file.name}`,err=>{
        if(err){
            console.log(err)
            res.status(500).send(err)
        }
        console.log("File uploaded")
    })

})

module.exports = router