const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);

module.exports.hashPw = password => {
    return genSalt().then(salt => {
        return hash(password, salt);
    });
};

module.exports.checkHashData = (formValue, dbValue) => {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(formValue, dbValue, function(err, doesMatch) {
            if (err) {
                reject(err);
            } else {
                resolve(doesMatch);
            }
        });
    });
};
