/* globals module require Promise */

module.exports = function (models) {
    let {
        User
    } = models;

    return {
        createUser(username, passwordHash, email) {
            let user = new User({
                username: username,
                passwordHash: passwordHash,
                email: email,
                dateCreated: new Date()
            });

            return new Promise((resolve, reject) => {
                user.save((err, savedUser) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(savedUser);
                });
            });
        }
    };
};