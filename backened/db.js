const mongoose = require('mongoose');
const mongodbURI = 'mongodb://localhost:27017/inotebook';
function connecttomongodb() {
    mongoose.connect(mongodbURI).then(() => { 
        console.log('connected to mongodb server'); 
    })
}


module.exports = connecttomongodb;