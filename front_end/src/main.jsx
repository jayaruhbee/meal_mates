import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import  router  from './router'
import './index.css'

import { ThemeProvider } from "@material-tailwind/react";


ReactDOM.createRoot(document.getElementById("root")).render(
  
    <ThemeProvider>
        <RouterProvider router={router} />
    </ThemeProvider>
);
