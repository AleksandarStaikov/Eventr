
module.exports = function (userModel) {
    return {
        createSaveUser(userName, passwordHesh, email) {
            return new Promise((resolve, reject) => {

                let user = new userModel({
                    userName: userName,
                    passwordHesh: passwordHesh,
                    email: email,
                    dateCreated: new Date()
                })

                user.save((err, savedUser, numAffected) =>{
                    if(err){
                        return reject(err);
                    }
                    return resolve(savedUser)
                });
            })
        }
    }
};