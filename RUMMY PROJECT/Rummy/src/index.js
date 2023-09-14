const express = require("express")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const route = require("./route/pointTableMasterRoutes")
const pockerRoute = require("./route/pokerMasterRoutes")
const rummyPointHistoryRoute = require("./route/rummyPointHistoryRoutes")
const pockerHistoryRoute = require("./route/pokerHistoryRoutes")
const rummyDealRoute = require("./route/rummyDealRouter")
const app = express()
const cors = require("cors");

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.use(cors());

mongoose.connect("mongodb+srv://BIKASH:2NQSqnkWjFq2TWNe@cluster0.bbmcbft.mongodb.net/rummy",{usenewUrlParser : true})
.then(()=>console.log("MongoDB is connected"))
.catch((err)=>console.log(err.message))

app.use("/",route)
app.use("/",pockerRoute)
app.use("/",rummyPointHistoryRoute)
app.use("/",pockerHistoryRoute)
app.use("/",rummyDealRoute)


app.listen(3000,() => {
    console.log("Express is running on port "+ 3000)
})



//mongodb+srv://BIKASH:2NQSqnkWjFq2TWNe@cluster0.bbmcbft.mongodb.net/rummy