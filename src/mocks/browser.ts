import { aformHandlers } from './aformHandlers'
import { fileHandlers } from './fileHandlers'
import { flowHandlers } from './flowHandlers'
import { formHandlers } from './formHandlers'
import { loginHandlers } from './loginHandlers'
import { menuHandlers } from './menuHandlers'
import { optionHandlers } from './optionHandlers'
import { setupWorker } from 'msw/browser'

export const worker = setupWorker(
  ...loginHandlers,
  ...menuHandlers,
  ...aformHandlers,
  ...formHandlers,
  ...optionHandlers,
  ...fileHandlers,
  ...flowHandlers
)
