import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import i18n from './i18n.js'


// Extract language from current path (e.g., "/en", "/ka")
const language = window.location.pathname.split('/')[1] || 'en';

// Set initial language in i18n
if (i18n.language !== language) {
  i18n.changeLanguage(language);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter basename={`/${language}`}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
