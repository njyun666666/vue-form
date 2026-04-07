import { aformHandlers } from './aformHandlers'
import { fileHandlers } from './fileHandlers'
import { flowHandlers } from './flowHandlers'
import { formHandlers } from './formHandlers'
import { loginHandlers } from './loginHandlers'
import { menuHandlers } from './menuHandlers'
import { optionHandlers } from './optionHandlers'
import { orgDeptHandlers } from './orgDeptHandlers'
import { orgUserHandlers } from './orgUserHandlers'
import { routeAuthHandlers } from './routeAuthHandlers'
import { setupWorker } from 'msw/browser'

export const worker = setupWorker(
  ...loginHandlers,
  ...menuHandlers,
  ...aformHandlers,
  ...formHandlers,
  ...optionHandlers,
  ...fileHandlers,
  ...flowHandlers,
  ...orgDeptHandlers,
  ...orgUserHandlers,
  ...routeAuthHandlers
)
