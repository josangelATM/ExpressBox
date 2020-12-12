const User = require('../models/user')

module.exports = function(){
    var IBgenerate 
    var found = false
    do {
        IBgenerate = 'IB'+Math.floor(Math.random() * 10000 + 1)
        User.exists({IB : IBgenerate},function(err, result) {
            if (err) {
              console.log(err);
            } else {
                found = !result
            }
        });
    } while(found);
return IBgenerate

}
