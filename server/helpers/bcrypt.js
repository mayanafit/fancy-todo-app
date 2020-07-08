const bcrypt = require(`bcrypt`)
const saltRounds = 10;

function hashPassword(data) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(data.password, salt)
    return hash
}

function comparePassword(userData, systemData) {
    const result = bcrypt.compareSync(userData.password, systemData.password)
    return result
}

module.exports = {hashPassword, comparePassword}