const path = require('path')
const fs = require('fs')

exports.postVacationPhotoContestApi = async (req, res, fields, files) => {
  const dataDir = path.resolve(__dirname, '../../..', 'public/images')
  const vacationPhotoDir = path.join(dataDir, 'vacation-photos')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir)
  }
  if (!fs.existsSync(vacationPhotoDir)) {
    fs.mkdirSync(vacationPhotoDir)
  }

  // const photo = files.photo[0]
}
