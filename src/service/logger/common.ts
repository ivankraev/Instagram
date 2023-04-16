import { transports, format } from 'winston'
import 'winston-daily-rotate-file'

export const fileLogTransport = new transports.DailyRotateFile({
  filename: `logs/app/%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
})

export const loggerFormat = format.combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  format.errors({ stack: true }),
  format.splat(),
  format.printf(
    ({ level, message, label = process.env.NODE_ENV, timestamp }) =>
      `${timestamp} [${label}] ${level}: ${message}`,
  ),
)
