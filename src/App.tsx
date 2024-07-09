import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from './components/Layout/Layout'
import { Route, Routes } from 'react-router-dom'
import List from './components/List/List'
import Form from './components/Form/Form'

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={(
            <List></List>
          )}></Route>
          <Route path="/Add-meal" element={(
            <Form></Form>
          )}></Route>
          <Route path="/edit-meal/:id" element={(
            <Form></Form>
          )}></Route>
        </Routes>
      </Layout>
    </>
  )
}

export default App
