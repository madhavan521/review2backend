const express = require("express");
const ProtectRouter = require("../Middleware/ProtectRouter");
const { postdealercylinderpurchase } = require("../Controller/CylinderController");
//  createdata, getdata, deletedata, updatedata, typegetdata,,postdealerdelivery
const cylinderentryrouter = express.Router();

cylinderentryrouter.post('/create',ProtectRouter, postdealercylinderpurchase);
// cylinderentryrouter.post('/delivery/create' ,ProtectRouter ,postdealerdelivery);
// cylinderentryrouter.get('/get',ProtectRouter, getdata);
// cylinderentryrouter.get('/get/type', typegetdata);
// cylinderentryrouter.put('/update/:id', ProtectRouter, updatedata);
// cylinderentryrouter.delete('/delete/:id', ProtectRouter, deletedata);

module.exports = cylinderentryrouter;
