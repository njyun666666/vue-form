import App from './App.vue'
import { i18n } from './i18n/config'
import { primeVueConfig } from './primeVueConfig'
import router from './router'
import './styles/index.css'
import { zodErrorMap } from '@/libs/utils/zod'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { VueQueryPlugin } from '@tanstack/vue-query'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import { createApp } from 'vue'
import { z } from 'zod'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

library.add(fas, far, fab)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(PrimeVue, primeVueConfig)
app.use(VueQueryPlugin)
app.directive('tooltip', Tooltip)

z.setErrorMap(zodErrorMap)

enableMocking().then(() => {
  app.mount('#app')
})

async function enableMocking() {
  // if (process.env.NODE_ENV !== 'development') {
  //   return
  // }

  const { worker } = await import('./mocks/browser')

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest: 'bypass'
  })
}
