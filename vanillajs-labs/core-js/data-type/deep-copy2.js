var user = {
  name: 'YoungKim',
  urls: {
    naver: 'www.naver.com',
    facebook: 'www.facebook.com',
  },
  deep: {
    deep2: {
      a: 123,
    },
  },
}

function copyObjectViaJSON(target) {
  return JSON.parse(JSON.stringify(target))
}

var user2 = copyObjectDeep(user)
user2.name = 'Kim'
user2.urls.facebook = 'my-facebook'
user2.deep.deep2.a = '456'

if (user !== user2) {
  console.log('정보가 변경되었습니다.')
}

console.log(user, user2)
console.log(user == user2, user === user2)
