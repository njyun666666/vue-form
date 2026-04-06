import type { ButtonDesignTokens } from '@primeuix/themes/types/button'

const button: ButtonDesignTokens = {
  colorScheme: {
    light: {
      root: {
        secondary: {
          background: '{neutral.300}',
          hoverBackground: '{neutral.400}',
          activeBackground: '{neutral.500}'
        },
        contrast: { hoverBackground: '{neutral.700}', activeBackground: '{neutral.600}' }
      },
      text: {
        primary: { hoverBackground: '{primary.100}', activeBackground: '{primary.200}' },
        secondary: { hoverBackground: '{neutral.200}', activeBackground: '{neutral.300}' },
        success: { hoverBackground: '{green.100}', activeBackground: '{green.200}' },
        info: { hoverBackground: '{sky.100}', activeBackground: '{sky.200}' },
        warn: { hoverBackground: '{orange.100}', activeBackground: '{orange.200}' },
        help: { hoverBackground: '{purple.100}', activeBackground: '{purple.200}' },
        danger: { hoverBackground: '{red.100}', activeBackground: '{red.200}' },
        contrast: { hoverBackground: '{neutral.200}', activeBackground: '{neutral.300}' }
      },
      outlined: {
        primary: { hoverBackground: '{primary.100}', activeBackground: '{primary.200}' },
        secondary: { hoverBackground: '{neutral.200}', activeBackground: '{neutral.300}' },
        success: { hoverBackground: '{green.100}', activeBackground: '{green.200}' },
        info: { hoverBackground: '{sky.100}', activeBackground: '{sky.200}' },
        warn: { hoverBackground: '{orange.100}', activeBackground: '{orange.200}' },
        help: { hoverBackground: '{purple.100}', activeBackground: '{purple.200}' },
        danger: { hoverBackground: '{red.100}', activeBackground: '{red.200}' },
        contrast: { hoverBackground: '{neutral.200}', activeBackground: '{neutral.300}' }
      }
    },
    dark: {
      root: { contrast: { hoverBackground: '{neutral.200}', activeBackground: '{neutral.300}' } },
      text: {
        primary: { hoverBackground: '{primary.950}', activeBackground: '{primary.900}' },
        secondary: { hoverBackground: '{neutral.800}', activeBackground: '{neutral.700}' },
        success: { hoverBackground: '{green.950}', activeBackground: '{green.900}' },
        info: { hoverBackground: '{sky.950}', activeBackground: '{sky.900}' },
        warn: { hoverBackground: '{orange.950}', activeBackground: '{orange.900}' },
        help: { hoverBackground: '{purple.950}', activeBackground: '{purple.900}' },
        danger: { hoverBackground: '{red.950}', activeBackground: '{red.900}' },
        contrast: { hoverBackground: '{neutral.900}', activeBackground: '{neutral.800}' }
      },
      outlined: {
        primary: { hoverBackground: '{primary.950}', activeBackground: '{primary.900}' },
        secondary: { hoverBackground: '{neutral.800}', activeBackground: '{neutral.700}' },
        success: { hoverBackground: '{green.950}', activeBackground: '{green.900}' },
        info: { hoverBackground: '{sky.950}', activeBackground: '{sky.900}' },
        warn: { hoverBackground: '{orange.950}', activeBackground: '{orange.900}' },
        help: { hoverBackground: '{purple.950}', activeBackground: '{purple.900}' },
        danger: { hoverBackground: '{red.950}', activeBackground: '{red.900}' },
        contrast: { hoverBackground: '{neutral.900}', activeBackground: '{neutral.800}' }
      }
    }
  }
}

export default button
