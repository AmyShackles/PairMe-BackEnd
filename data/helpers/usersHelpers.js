const db = require('../dbConfig.js');

const bcrypt = require('bcryptjs');

module.exports = {
    getUsers,
    registerUser,
    availableEmail,
    availableUsername,
    availableHandle
}

// return all users, empty array if no users
function getUsers() {
    return db('users')
        .select('id', 'username', 'email', 'slack_handle');
};

// register new user if valid
function registerUser(user) {
    const newUser = user;
    const hash = bcrypt.hashSync(newUser.password, 14);
    newUser.username = newUser.username.toLowerCase();
    newUser.email = newUser.email.toLowerCase();
    newUser.slack_handle = newUser.slack_handle.toLowerCase();
    newUser.password = hash;

    return db('users')
        .insert(newUser)
        .then(id => {
            console.log(id);
            return id;
        })
        .catch(err => {
            return false;
        });

};

// true if username is not in database
function availableUsername(name) {
    name = name.toLowerCase();
    return db('users')
        .where({ username: name })
        .then(result => {
            if(result.length){
                return false;
            } else {
                return true;
            }
        });
};

// true if email not in database
function availableEmail(name) {
    name = name.toLowerCase();
    return db('users')
        .where({ email: name })
        .then(result => {
            if(result.length){
                return false;
            } else {
                return true;
            }
        });
};

// true if email not in database
function availableHandle(name) {
    name = name.toLowerCase();
    return db('users')
        .where({ slack_handle: name })
        .then(result => {
            if(result.length){
                return false;
            } else {
                return true;
            }
        });
};