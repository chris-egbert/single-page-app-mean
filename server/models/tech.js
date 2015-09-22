var mongoose = require('mongoose');

module.exports = mongoose.model('Tech', {
        'name'     : {type : String, default: ''},
        'category' : {type : String, default: ''},
        'votes'    : {type : Number, default: 0},
});
