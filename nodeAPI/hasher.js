const bcrypt = require('bcrypt');

const saltRounds = 10;

 async function genHash(plainTextPassword) {
    // Technique 1 (generate a salt and hash on separate function calls):
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainTextPassword, salt);

    // Technique 2 (auto-gen a salt and hash):
    // const hash2 = bcrypt.hashSync(plainTextPassword, saltRounds);
    
    return hash;
}

async function compareHash(plainTextPassword, hash) {
    return await bcrypt.compare(plainTextPassword, hash)
}
module.exports = {
    genHash,
    compareHash
}