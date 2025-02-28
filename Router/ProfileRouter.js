const express = require("express")
const ProtectRouter = require("../Middleware/ProtectRouter")
const { add, get, update, getotp, otpverify } = require("../Controller/ProfileController")

const profilerouter =express.Router()

profilerouter.post('/add',ProtectRouter,add )
profilerouter.get('/get', ProtectRouter,get)
profilerouter.put('/update/:id', ProtectRouter,update)
profilerouter.post('/getotp',ProtectRouter,getotp )
profilerouter.post('/verifyotp',ProtectRouter,otpverify )


module.exports = profilerouter;