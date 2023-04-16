import { createLogger, transports } from 'winston'
import { fileLogTransport, loggerFormat } from './common'

const consoleDevTransport = new transports.Console()

export const devLogger = createLogger({
  level: 'debug',
  format: loggerFormat,
  transports: [fileLogTransport, consoleDevTransport],
})
