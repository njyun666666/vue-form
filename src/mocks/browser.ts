import { formHandlers } from './formHandlers'
import { loginHandlers } from './loginHandlers'
import { menuHandlers } from './menuHandlers'
import { optionHandlers } from './optionHandlers'
import { setupWorker } from 'msw/browser'

export const worker = setupWorker(
  ...loginHandlers,
  ...menuHandlers,
  ...formHandlers,
  ...optionHandlers
)
