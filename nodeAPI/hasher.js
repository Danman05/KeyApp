const bcrypt = require('bcrypt');

const saltRounds = 10;

// Generate a hash
async function genHash(plainTextPassword) {
    return await bcrypt.hash(plainTextPassword, saltRounds);
}
// Compare a hash
async function compareHash(plainTextPassword, hash) {
    return await bcrypt.compare(plainTextPassword, hash)
}

module.exports = {
    genHash,
    compareHash
}