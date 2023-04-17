import { Logger } from 'winston'

import { devLogger } from './dev'
import { prodLogger } from './prod'

let logger: Logger | null = null

if (process.env.NODE_ENV === 'production') {
  logger = prodLogger
} else {
  logger = devLogger
}

export default logger
