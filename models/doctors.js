
//Import orm


var orm = require("../config/orm.js");

var doctor = {
    all: function(cb) {
        orm.all("doctors", function(res) {
            cb(res);
        });
    },
    create: function(cols, vals, cb) {
        orm.create("doctors", cols, vals, function(res){
            cb(res);
        });
    },
    update: function(objColVals, condition, cb) {
        orm.update("doctors", objColVals, condition, function(res){
            cb(res);
        });
    }
};

module.exports = doctor;

