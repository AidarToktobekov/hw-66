import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from './components/Layout/Layout'
import { Route, Router, Routes } from 'react-router-dom'
import List from './components/List/List'

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={(
            <List></List>
          )}></Route>
        </Routes>
      </Layout>
    </>
  )
}

export default App
