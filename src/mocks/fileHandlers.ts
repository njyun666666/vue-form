import appConfig from '@/appConfig'
import { multipleProductImageFaker } from '@/faker/productImage'
import { fileService } from '@/libs/services/fileService'
import { HttpResponse, delay, http } from 'msw'

export const fileHandlers = [
  http.post(`${appConfig.FORM_API}${fileService.uploadUrl}`, async ({ request }) => {
    const data = await request.formData()
    const groupId = data.get('groupId')?.toString()
    console.log(groupId)
    const files = data.getAll('files')
    await delay()
    return HttpResponse.json(multipleProductImageFaker(files.length, groupId))
  }),
  http.get(`${appConfig.FORM_API}${fileService.listUrl}/:groupId`, async ({ params }) => {
    const { groupId } = params
    await delay()
    return HttpResponse.json(multipleProductImageFaker(1, String(groupId)))
  })
]
