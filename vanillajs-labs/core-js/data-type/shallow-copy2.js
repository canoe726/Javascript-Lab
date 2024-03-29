var user = {
  name: 'YoungKim',
  gender: 'male',
}

var changeName = function (user, newName) {
  return {
    name: newName,
    gender: user.gender,
  }
}

var user2 = changeName(user, 'Kim')

if (user !== user2) {
  console.log('정보가 변경되었습니다.')
}

console.log(user.name, user2.name)
console.log(user === user2)
