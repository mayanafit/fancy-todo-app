const axios = require(`axios`)

class QuotesController {
    static show(req, res, next) {
        axios({
            method: `GET`,
            url: `https://favqs.com/api/qotd`
        })
        .then(response => {
            res.status(200).json({data: response.data.quote})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = QuotesController