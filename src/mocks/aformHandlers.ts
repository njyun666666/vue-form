import appConfig from '@/appConfig'
import { formFaker } from '@/faker/form'
import { aService } from '@/libs/services/forms/aService'
import { HttpResponse, delay, http } from 'msw'

export const aformHandlers = [
  http.get(`${appConfig.FORM_API}${aService.dataUrl}/:formId`, async ({ params }) => {
    await delay()
    const { formId } = params
    return HttpResponse.json(formFaker[formId as keyof typeof formFaker].data)
  })
]
