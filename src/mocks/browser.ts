import { aformHandlers } from './aformHandlers'
import { fileHandlers } from './fileHandlers'
import { flowHandlers } from './flowHandlers'
import { formHandlers } from './formHandlers'
import { loginHandlers } from './loginHandlers'
import { menuHandlers } from './menuHandlers'
import { optionHandlers } from './optionHandlers'
import { orgDeptHandlers } from './orgDeptHandlers'
import { orgDeptLevelHandlers } from './orgDeptLevelHandlers'
import { orgRoleHandlers } from './orgRoleHandlers'
import { orgTreeHandlers } from './orgTreeHandlers'
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
  ...orgDeptLevelHandlers,
  ...orgRoleHandlers,
  ...orgTreeHandlers,
  ...orgUserHandlers,
  ...routeAuthHandlers
)
