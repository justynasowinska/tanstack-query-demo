async function startApp() {
  if (import.meta.env.DEV) {
    const { scan } = await import('react-scan')

    scan({
      enabled: true,
    })
  }

  await import('./bootstrapApp')
}

void startApp()
