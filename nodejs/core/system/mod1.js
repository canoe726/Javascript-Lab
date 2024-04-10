var globalValue

exports.setGlobal = function (val) {
  globalValue = val
}

exports.returnGlobal = function (val) {
  console.log(global)
  return globalValue
}
