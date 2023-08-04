const mongoose = require('mongoose');
const mongodbURI = 'mongodb+srv://aksingher564:ayush123@cluster0.gyeqwz2.mongodb.net/iNotebook?retryWrites=true&w=majority';
function connecttomongodb() {
    mongoose.connect(mongodbURI).then(() => { 
        console.log('connected to mongodb server'); 
    })
}


module.exports = connecttomongodb;