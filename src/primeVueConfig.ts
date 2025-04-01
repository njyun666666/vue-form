import primeVuePreset from './primeVuePreset'
import type { PrimeVueConfiguration } from 'primevue/config'

export const primeVueConfig: PrimeVueConfiguration = {
  theme: {
    preset: primeVuePreset,
    options: {
      darkModeSelector: '.dark'
    }
  }
}
