const { PurchaseDealerCylinder, DealerCylinder, DealerDelivery } = require('../Schema/DealerCylinderSchema');
const Dealer = require('../Schema/DealerSchema');
const Reseller = require('../Schema/ResellerSchema');

const postdealercylinderpurchase = async (req, res) => {  
    const { cylinderType, fullCylinder, emptyCylinder } = req.body;  

    try {  
        const UserId = req.user._id;  
        const username = await Dealer.findById(UserId);  
        if (!username) {  
            return res.status(404).send("Invalid User from database");  
        }  

        const Cylinderdeliverydata = new PurchaseDealerCylinder({  
            purchasecylinderType: cylinderType,  
            purchasefullCylinder: fullCylinder,  
            purchaseemptyCylinder: emptyCylinder  
        });  
        await Cylinderdeliverydata.save();  

        // Retrieve existing Cylinder data or create new  
        let individualCylinderType = await DealerCylinder.findOne();  
        if (!individualCylinderType) {  
            individualCylinderType = new DealerCylinder({  
                DealerCylinder5kg: [],  
                DealerCylinder14kg: [],  
                DealerCylinder17kg: [],  
                DealerCylinder19kg: [],  
                DealerCylinder21kg: [],  
                DealerCylinder45kg: []  
            });  
        }  

        let targetCylinderArray;  
        switch(cylinderType) {  
            case "5kg":  
                targetCylinderArray = individualCylinderType.DealerCylinder5kg;  
                break;  
            case "14kg":  
                targetCylinderArray = individualCylinderType.DealerCylinder14kg;  
                break;  
            case "17kg":  
                targetCylinderArray = individualCylinderType.DealerCylinder17kg;  
                break;  
            case "19kg":  
                targetCylinderArray = individualCylinderType.DealerCylinder19kg;  
                break;  
            case "21kg":  
                targetCylinderArray = individualCylinderType.DealerCylinder21kg;  
                break;  
            case "45kg":  
                targetCylinderArray = individualCylinderType.DealerCylinder45kg;  
                break;  
            default:  
                return res.status(400).send("Invalid Cylinder Type");  
        }  

        let existingEntry = targetCylinderArray.length > 0 ? targetCylinderArray[0] : null;  

        if (existingEntry) {  
            existingEntry.fullCylinder += parseInt(fullCylinder);  
            existingEntry.emptyCylinder -= parseInt(fullCylinder);  
            existingEntry.fullCylinder -= parseInt(emptyCylinder);  
            existingEntry.emptyCylinder += parseInt(emptyCylinder);  
        } else {  
            targetCylinderArray.push({  
                fullCylinder: parseInt(fullCylinder),  
                emptyCylinder: -parseInt(fullCylinder)  
            });  
        }  

        await individualCylinderType.save();  

        username.TotalCylinder = individualCylinderType;   
        username.PurchaseCylinder.push(Cylinderdeliverydata);  
        await username.save();  

        return res.status(201).send({ message: "Cylinder Data Updated Successfully", username });  
    } catch (err) {  
        console.error("Error:", err.message);  
        return res.status(500).send(err.message);  
    }  
};

const postdealerdelivery = async (req, res) => {  
    const { cylinderType, fullCylinder, emptyCylinder, username } = req.body;  

    try {  
        // Get the dealer's 
        const UserId = req.user._id;  
        const dealerdata = await Dealer.findById(UserId);  
        if (!dealerdata) {  
            return res.status(404).send("Dealer not found");  
        }  

        // Check if the reseller exists in the dealer's resellers list  
        const resellerdata = dealerdata.Reseller.find(item => item.username === username);  
        if (!resellerdata) {  
            return res.status(404).send("Reseller not found");  
        }  
        const resellers = await Reseller.findOne({ username });  
        if (!resellers) {  
            return res.status(404).send("Reseller data not found in the database");  
        }  

        // Create a new DealerDelivery entry  
        const Cylinderdeliverydata = new DealerDelivery({  
            username,  
            dealerdeliverycylinderType: cylinderType,  
            dealerdeliveryfullCylinder: fullCylinder,  
            dealerdeliveryemptyCylinder: emptyCylinder  
        });  
        await Cylinderdeliverydata.save();  

        dealerdata.CylinderDelivery.push(Cylinderdeliverydata);  
        await dealerdata.save();  

        return res.status(201).json(dealerdata); 
    } catch (err) {  
        console.error("Error:", err.message);  
        return res.status(500).json({ message: "Server Error", error: err.message });  
    }  
};

























const createdata = async (req, res) => {
    const { cylinderType, fullCylinder, emptyCylinder } = req.body;

    try {
        const UserId = req.user._id
        const username = await Dealer.findById(UserId) || await Reseller.findById(UserId)
        if(!username)
        {
            return res.status(404).send("Invalid User from database")
        }
            
        const Cylinderdeliverydata =new CylinderData({cylinderType, fullCylinder, emptyCylinder})
        await Cylinderdeliverydata.save()


        let individualCylinderType = await IndividualCylinderType.findOne();
        if (!individualCylinderType) {
            individualCylinderType = new IndividualCylinderType({
                cylinder5kg: [],
                cylinder10kg: [],
                cylinder15kg: []
            });
        }

        let targetCylinderArray;
        if (cylinderType === "5kg") {
            targetCylinderArray = individualCylinderType.cylinder5kg;
        } else if (cylinderType === "10kg") {
            targetCylinderArray = individualCylinderType.cylinder10kg;
        } else if (cylinderType === "15kg") {
            targetCylinderArray = individualCylinderType.cylinder15kg;
        } else {
            return res.status(400).send("Invalid Cylinder Type");
        }

        let existingEntry = targetCylinderArray.length > 0 ? targetCylinderArray[0] : null;

        if (existingEntry) {
            existingEntry.fullCylinder += fullCylinder;
            existingEntry.emptyCylinder -= fullCylinder;
            existingEntry.fullCylinder -= emptyCylinder;
            existingEntry.emptyCylinder += emptyCylinder;
        } else {
            targetCylinderArray.push({
                fullCylinder: fullCylinder,
                emptyCylinder: -fullCylinder
            });
        }

        await individualCylinderType.save();

      username.TotalCylinder.push(individualCylinderType)
      username.CylinderDelivery.push(Cylinderdeliverydata)
      await username.save()

        return res.status(201).send({ message: "Cylinder Data Added Successfully", username });
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).send(err.message);
    }
};

// const getdata = async (req, res) => {
//     try {
//         const getdata = await CylinderData.find();
//         if (!getdata) {
//             return res.status(404).send("Data Not Available");
//         }
//         return res.status(200).send(getdata);
//     } catch (err) {
//         return res.status(404).send(err.message);
//     }
// };

// const typegetdata = async (req, res) => {
//     try {
//         const getdata = await IndividualCylinderType.find();
//         if (!getdata) {
//             return res.status(404).send("Data Not Available");
//         }
//         return res.status(200).send(getdata);
//     } catch (err) {
//         return res.status(404).send(err.message);
//     }
// };

// const updatedata = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const update = req.body;
//         const updatedata = await CylinderData.findByIdAndUpdate(id, update, {
//             new: true, runValidator: true
//         });
//         res.status(201).send(updatedata);
//     } catch (err) {
//         return res.status(404).send(err.message);
//     }
// };

// const deletedata = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const getdata = await CylinderData.findById(id);
//         if (!getdata) {
//             return res.status(404).send("Already Deleted or Data not found");
//         }
//         await CylinderData.findByIdAndDelete(id);
//         return res.status(200).send("Item Deleted Successfully");
//     } catch (err) {
//         return res.status(404).send(err.message);
//     }
// };

module.exports = { postdealercylinderpurchase ,postdealerdelivery};

// createdata, getdata, deletedata, updatedata, typegetdata,