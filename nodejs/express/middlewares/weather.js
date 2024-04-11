const getWeather = () =>
  new Promise((resolve, reject) => {
    resolve([
      {
        location: {
          name: 'Portland',
          forecastUrl: 'https://www.google.com',
        },
        weather: 'Chance Showers Adn Thunderstorms',
      },
      {
        location: {
          name: 'Bend',
          forecastUrl: 'https://www.naver.com',
        },
        weather: 'Scattered Showers And Thunderstorms',
      },
    ])
    reject(new Error('failed'))
  })

const weatherMiddleware = async (req, res, next) => {
  if (!res.locals.partials) res.locals.partials = {}
  res.locals.partials.weatherContext = await getWeather()
  next()
}

module.exports = weatherMiddleware
