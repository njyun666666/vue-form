import { i18n } from '@/i18n/config'
import _ from 'lodash'
import type { ConfirmationOptions } from 'primevue/confirmationoptions'
import { useConfirm } from 'primevue/useconfirm'

export const createConfirm = (confirmService: ReturnType<typeof useConfirm>) => {
  const { t } = i18n.global

  const open = async (option: ConfirmationOptions) => {
    return new Promise((resolve) => {
      const init = _.merge(
        {
          message: '',
          header: t('Title.Confirm'),
          // icon: 'pi pi-exclamation-triangle',
          rejectProps: {
            label: t('Action.Cancel'),
            severity: 'secondary',
            outlined: true
          },
          acceptProps: {
            label: t('Action.OK')
          },
          accept: () => {
            resolve(true)
          },
          reject: () => {
            resolve(false)
          }
        },
        option
      )

      confirmService.require(init)
    })
  }

  const alert = async (option: ConfirmationOptions) => {
    const init = _.merge(
      {
        message: '',
        header: t('Title.Alert'),
        rejectProps: {
          class: 'hidden'
        }
      },
      option
    )
    return open(init)
  }

  return {
    open,
    alert
  }
}
