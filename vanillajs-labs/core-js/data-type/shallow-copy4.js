var user = {
  name: 'YoungKim',
  urls: {
    naver: 'www.naver.com',
    facebook: 'www.facebook.com',
  },
}

var copyObject = function (target) {
  var result = {}

  for (var prop in target) {
    result[prop] = target[prop]
  }
  return result
}

var user2 = copyObject(user)
user2.name = 'Kim'
user2.urls.facebook = 'my-facebook'

if (user !== user2) {
  console.log('정보가 변경되었습니다.')
}

console.log(user, user2)
console.log(user == user2, user === user2)

var user3 = copyObject(user)
user3.urls = copyObject(user.urls)
user3.urls.facebook = 'hello-world'

console.log(user, user3)
console.log(user == user3, user === user3)
