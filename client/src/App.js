import React from 'react'
import Header from './components/header/headers'
import Pages from './components/mainpage/Page'
import {  BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import { DataProvider } from './GlobalState'

const App = () => {
  return (
    <DataProvider>
    <Router>
    <div className='App'>
      <Header/>
      <Pages/>
    </div>
    </Router>
    </DataProvider>
  )
}

export default App