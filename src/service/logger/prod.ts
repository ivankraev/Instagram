import { createLogger, transports } from 'winston'
import 'winston-daily-rotate-file'

import { fileLogTransport, loggerFormat } from './common'

const consoleProdTransport = new transports.Console({
  level: 'error',
})

const aggregationServiceTransport = new transports.Http({
  host: 'localhost',
  port: 3000,
  path: 'api/log',
})

export const prodLogger = createLogger({
  level: 'info',
  format: loggerFormat,
  transports: [fileLogTransport, consoleProdTransport, aggregationServiceTransport],
})
