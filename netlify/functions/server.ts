import { Handler } from '@netlify/functions'
import express from 'express'
import payload from 'payload'
import serverless from 'serverless-http'

require('dotenv').config()

const app = express()

// Initialize Payload
const initPayload = async () => {
  if (!payload.isInitialized) {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      express: app,
      onInit: async () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
      },
    })
  }
}

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const handler: Handler = async (event, context) => {
  await initPayload()
  const serverlessHandler = serverless(app)
  return serverlessHandler(event, context)
}

export { handler }
