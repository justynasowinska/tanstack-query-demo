async function startApp() {
  if (import.meta.env.DEV) {
    const { scan } = await import('react-scan')

    scan({
      enabled: true,
    })
  }

  const { bootstrapApp } = await import('./bootstrapApp')
  bootstrapApp()
}

void startApp()
