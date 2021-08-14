import '../styles/Main.css';
import React, { useState } from 'react'
import { Route, Switch } from "react-router-dom"
import Topbar from '../components/Topbar'
import Searchbar from '../components/Searchbar'
import MapContainer from '../components/MapContainer'
import Results from '../components/Results'
import { Layout } from 'antd'
import Sider from 'antd/lib/layout/Sider'

const { Header } = Layout;

function Main(){
  const [keyword, setKeyword] = useState("");
  const [price, setPrice] = useState(0);
  const [rate, setRate] = useState(0);
  const [address1, setAddress1] = useState(null);
  const [address2, setAddress2] = useState(null);
  const [address3, setAddress3] = useState(null);
  const [tags, setTags] = useState([]);

  const handleChange = (event) => {
    setKeyword(event.target.value);
  }
  const changeAddress1 = (value) => {
    setAddress1(value);
    setAddress2(null);
    setAddress3(null);
  }
  const changeAddress2 = (value) => {
    setAddress2(value);
    setAddress3(null);
  }
  const changeAddress3 = (value) => {
    setAddress3(value);
  }
  const sliderChange = (value) => {
    setPrice(value);
  }
  const rateChange = (value) => {
    setRate(value);
  }
  const tagChange = (tag, checked) => {
    const nextTags = checked ? [...tags, tag] : tags.filter(t => t !== tag);
    setTags(nextTags);
  }

  const state = {keyword, price, rate, address1, address2, address3, tags};

  return (
    <Layout>
    <Header>
      <Topbar />
    </Header>
    <Layout hasSider={true}>
      <Sider>
        <Searchbar
          handleChange={handleChange}
          sliderChange={sliderChange}
          rateChange={rateChange}
          tagChange={tagChange}
          changeAddress1={changeAddress1}
          changeAddress2={changeAddress2}
          changeAddress3={changeAddress3}
          state={state}
        />
      </Sider>
      <Switch>
        <Route path='/search' render={() => <Results state={state}/>} />
        <Route path='/' render={() => <MapContainer state={state}/>} />
      </Switch>
    </Layout>
  </Layout>
  )
}

export default Main;