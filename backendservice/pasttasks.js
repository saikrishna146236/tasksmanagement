const mongoDbService = require('../backendservice/mongodbservice')
const bodyParser = require('body-parser')
const authHandler = require('./authhandler'); 
const commonService=require('../backendservice/common');

exports.getAllpastTaskManagementOperation = (app) => {
    

    app.get('/retrievepast', bodyParser.json(), (request, response) => {
        var cutoff = new Date();
        mongoDbService.assets.find({endDate:{$lt:cutoff}})
            
            .sort({endDate:1})
            .then(val => {
                console.log(val);
                response.json(val);

            }).catch(err => {
                console.error("retrieveretrieve operation in errr"+err);
            })

    });
    
}
