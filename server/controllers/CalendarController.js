const axios = require(`axios`)

class CalendarController {
    static show(req, res, next) {
        axios({
            method: `GET`,
            url: `https://calendarific.com/api/v2/holidays?api_key=${process.env.HOLIDAY}&country=ID&year=2020`
        })
        .then(respond => {
            res.status(200).json(respond.data.response.holidays)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = CalendarController