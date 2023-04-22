import { createApp } from 'vue'

export function withSetup(composable: Function) {
  let result: unknown
  const app = createApp({
    setup() {
      result = composable()

      return () => {}
    },
  })
  app.mount(document.createElement('div'))
  return [result, app]
}
