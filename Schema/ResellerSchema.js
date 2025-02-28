const mongoose = require("mongoose");
const resellerSchema = mongoose.Schema({  
    username: {  
        type: String,  
        required: "true"  
    },  
    fullname: {  
        type: String,  
        required: "true"  
    },  
    email: {  
        type: String,  
        required: "true"  
    },  
    password: {  
        type: String,  
        required: "true"  
    },  

    Profile:[{
    type:Object,
    default:[]
     }],
    Userdata:[{
        type:Object,
        default:[]
    }],
    MyDealer:[{
        type:Object,
        default:[],
    }],
    MyCylinder:[{
        type:Object,
        deafult:[]
    }]
   
});

const Reseller = mongoose.model("Reseller" , resellerSchema)

module.exports = Reseller;

