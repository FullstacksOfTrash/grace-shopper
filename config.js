try {
  Object.assign(process.env, require('.../env'))
}
catch(ex) {

}

module.exports = process.env;

