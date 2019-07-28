import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import loadable from 'util/loadable'

// import Home from './pages/home'
const Home = loadable(() => import('pages/tabbar/home'))
const Writer = loadable(() => import('pages/tabbar/writer'))
const Article = loadable(() => import('pages/article'))
const WriterDetails = loadable(() => import('pages/writer'))

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/writer" component={Writer} />
      <Route path="/article/:articleId" component={Article} />
      <Route path="/writerinfo/:writerId" component={WriterDetails} />
    </Router>
  )
}

export default App
