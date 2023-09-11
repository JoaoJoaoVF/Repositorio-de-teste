import React, { Suspense, useState } from 'react'

import {  useRoutes } from 'react-router-dom'

import routes from '~react-pages'

function App() {

  return (
    <div>

      <Suspense fallback={<p>Loading...</p>}>
  
       {useRoutes(routes)}
     
      </Suspense>

    </div>
  )
}

export default App
