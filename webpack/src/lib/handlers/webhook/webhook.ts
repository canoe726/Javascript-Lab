import express, { Request, Response } from 'express'

import { socketIo } from 'app'
import { LineMessageWebHookResponse } from 'lib/handlers/webhook/webhook.type'
import { timeLog } from 'lib/logger'

const router = express.Router()

router.use(timeLog as any)

router.get('/', function (req, res) {
  res.send('hello')
})

router.post('/', async function (req: Request, res: Response) {
  const responseBody = req.body as LineMessageWebHookResponse
  const events = responseBody.events

  events.forEach(({ message }) => {
    const chatNamespace = socketIo.getNamespace('/chat')

    if (chatNamespace) {
      chatNamespace.instance.to('0').emit('email', message.text)
    }
  })
})

export default router
