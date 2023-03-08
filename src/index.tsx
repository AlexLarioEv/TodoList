import React from 'react'
import { createRoot } from 'react-dom/client'

// eslint-disable-next-line import/namespace
import App from './Components/App/App'

const container = document.getElementById('root')
const root = createRoot(container as Element | DocumentFragment)
root.render(<App />)
