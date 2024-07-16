import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createTheme, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material'

const dark = createTheme({
  palette:{
    mode:'dark',
    background:{
      default:"#0E1220",
      paper:"#151B30"
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={dark} >
      <CssBaseline />
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
