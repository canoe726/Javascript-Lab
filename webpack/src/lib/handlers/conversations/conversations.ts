import express, { Request, Response } from 'express'

import { timeLog } from 'lib/logger'
import { chatList } from 'test/data/chatList'
import { emailList } from 'test/data/emailList'

const router = express.Router()

router.use(timeLog as any)

router.get('/', function (req: Request, res: Response) {
  res.statusCode = 200

  res.send(chatList)
})

router.get('/:conversationId/emails', function (req: Request, res: Response) {
  res.statusCode = 200
  const { conversationId } = req.params

  res.send(emailList[conversationId])
})

router.put('/:conversationId/email', function (req: Request, res: Response) {
  const { text } = req.body

  res.send(text)
})

export default router
