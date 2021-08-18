import '../styles/Main.css';
import React, { useState } from 'react'
import { Route, Switch } from "react-router-dom"
import Topbar from '../components/Topbar'
import Searchbar from '../components/Searchbar'
import MapContainer from '../components/MapContainer'
import Results from '../components/Results'
import { Layout } from 'antd'

const { Header, Sider } = Layout;

function Main(){
  const [keyword, setKeyword] = useState("");
  const [price, setPrice] = useState(0);
  const [rate, setRate] = useState(0);
  const [address1, setAddress1] = useState(null);
  const [address2, setAddress2] = useState(null);
  const [address3, setAddress3] = useState(null);
  const [tags, setTags] = useState([]);

  const funcs = { setKeyword, setPrice, setRate, setAddress1, setAddress2, setAddress3, setTags }
  const filterData = { keyword, price, rate, address1, address2, address3, tags }

  return (
    <Layout>
    <Header>
      <Topbar />
    </Header>
    <Layout hasSider={true}>
      <Sider>
        <Searchbar funcs={funcs} filterData={filterData} />
      </Sider>
      <Switch>
        <Route path='/search' render={() => <Results filterData={filterData} />} />
        <Route path='/' render={() => <MapContainer />} />
      </Switch>
    </Layout>
  </Layout>
  )
}

export default Main;