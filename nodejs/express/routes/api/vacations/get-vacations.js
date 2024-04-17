const { getVacations } = require('../../../database/postgres/db')

exports.getVacationsApi = async (req, res) => {
  const vacations = await getVacations()
  res.send(vacations)
}
