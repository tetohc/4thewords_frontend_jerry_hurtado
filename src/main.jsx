import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import './styles.css'
import { LegendsApp } from './LegendsApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LegendsApp />
    </BrowserRouter>
  </StrictMode>,
)
