module.exports = function (userModel) {
    return {
        createUser(userName, passwordHesh, email) {
            return new Promise((resolve, reject) => {

                let user = new userModel({
                    userName: userName,
                    passwordHesh: passwordHesh,
                    email: email,
                    dateCreated: Date.now
                })

                resolve(user);

            })
        }
    }
};