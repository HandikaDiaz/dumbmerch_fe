import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ThemeProvider } from '@emotion/react'
import theme from './utils/theme'
import { store } from './store/redux'
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={new QueryClient}>
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
