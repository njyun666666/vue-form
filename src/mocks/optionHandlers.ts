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
  }),
  http.get(`${appConfig.FORM_API}${optionService.productCategoryUrl}`, async () => {
    await delay()
    return HttpResponse.json([
      { label: '中央處理器 (CPU)', value: 'cpu' },
      { label: '主機板 (Motherboard)', value: 'motherboard' },
      { label: '記憶體 (RAM)', value: 'ram' },
      { label: '顯示卡 (GPU)', value: 'gpu' },
      { label: '硬碟 (HDD)', value: 'hdd' },
      { label: '固態硬碟 (SSD)', value: 'ssd' },
      { label: '電源供應器 (PSU)', value: 'psu' },
      { label: '機殼 (Case)', value: 'case' },
      { label: '散熱器 (Cooler)', value: 'cooler' },
      { label: '風扇 (Fan)', value: 'fan' },
      { label: '光碟機 (Optical Drive)', value: 'optical_drive' },
      { label: '鍵盤 (Keyboard)', value: 'keyboard' },
      { label: '滑鼠 (Mouse)', value: 'mouse' },
      { label: '螢幕 (Monitor)', value: 'monitor' },
      { label: '音效卡 (Sound Card)', value: 'sound_card' },
      { label: '網路卡 (Network Card)', value: 'network_card' }
    ] as OptionModel<string>[])
  })
]
