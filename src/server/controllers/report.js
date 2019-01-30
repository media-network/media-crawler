import bodyParser from 'body-parser'
import { BAD_REQUEST } from 'http-status-codes'
import joi from 'joi'
import shortHash from 'shorthash'

import Report from 'models/report'
import { analyze } from 'services/analyzer'

const SCHEMA = joi.object().keys({
  url: joi.string().trim().required()
})

export default {
  get(req, res, next) {
    res.render('pages/report')
  },
  post: [
    bodyParser.urlencoded({ extended: true }),
    async (req, res, next) => {
      const body = req.body
      const values = await joi.validate(body, SCHEMA)

      const time = Date.now()
      const identifier = shortHash.unique(`${ values.url }-${ time }`)

      // res.redirect(`/reports/${ identifier }`)

      res.redirect('/')

      await analyze({
        url: values.url,
        identifier
      })
    }
  ]

}
