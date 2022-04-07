import { StrictMode } from "react"
import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import * as ReactDOMClient from "react-dom/client"

import { App, Userprofile, LoginWindow } from "./App"

const rootElement = document.getElementById("root")
const root = ReactDOMClient.createRoot(rootElement as Element)

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="profile" element={<Userprofile />} />
        <Route path="login" element={<LoginWindow />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
