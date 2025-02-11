import appConfig from '@/appConfig'
import { loginService } from '@/libs/services/loginService'
import { HttpResponse, http } from 'msw'

export const loginHandlers = [
  http.post(`${appConfig.FORM_API}${loginService.loginUrl}`, () => {
    return HttpResponse.json({
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJlNjhmNTExODkwMmJlMGRhYWVmMGZhMzMwMGI2NDNiNiIsInJvbGUiOlsiMTkxYTc4M2ZjNTZlMmVlNWQ5ZjlkMzliZWY0ZDg0ZWEiLCIyMmQ5MzI1YTRjY2Q2YzE4NmQzODAzYjYyNTY4NWY4MiIsIjcyZmU3ZmQ2M2RmMzE2NmJiZDI3MmNlY2E1ZWFlOTcwIiwiYTU3YzM4MGJiMWI4ZGNjN2FjODJlODUxN2E0ZWNiYjYiLCJiNjA3Y2Q3NjFkNTllNTNhYzIwZGY5YThkNDE2ZTZmNyIsImJlMDAxZDdiYWYyMTQyMGM3NWQzMzM1ZmY3MWQ2NjYzIiwiZjI5OTE3OGFjYWFhY2Q0OWY4YjQ4OGNjZjM4MjE4ZmYiXSwic3ViIjoiQWRtaW4iLCJqdGkiOiI3ZTA0Zjg2YWYyODI0MDUxYmI5ZWY4ZWVjZDg1ZGFlYSIsIm5iZiI6MTczNDI0MDc4MywiZXhwIjoxNzY1Nzc2NzgzLCJpYXQiOjE3MzQyNDA3ODMsImlzcyI6IkZvcm0uQVBJIn0.lkbFVdJtLVuUwqIRCiABpSGM_YMmz80DK_CLD6H3Tsw',
      refresh_token: 'bea17251ca0847deab649e99ccec449e'
    })
  })
]
