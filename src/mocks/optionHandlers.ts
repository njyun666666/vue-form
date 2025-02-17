import appConfig from '@/appConfig'
import type { OptionModel } from '@/libs/models/Query/OptionModel'
import { optionService } from '@/libs/services/optionService'
import { HttpResponse, delay, http } from 'msw'

export const optionHandlers = [
  http.get(`${appConfig.FORM_API}${optionService.cityUrl}`, async () => {
    await delay()
    return HttpResponse.json([
      { label: '臺北市', value: 'Taipei' },
      { label: '新北市', value: 'NewTaipei' },
      { label: '桃園市', value: 'Taoyuan' }
    ] as OptionModel<string>[])
  })
]
