import { scan } from 'react-scan'

scan({
  enabled: true,
  dangerouslyForceRunInProduction: true,
})

void import('./bootstrapApp').then(({ bootstrapApp }) => {
  bootstrapApp()
})
