import '../styles/Main.css';
import React, { useState } from 'react'
import { Route, Switch } from "react-router-dom"
import Topbar from '../components/Topbar'
import Searchbar from '../components/Searchbar'
import Content from '../components/Content'
import Detail from '../pages/Detail'
import My from '../pages/My'
import { Layout } from 'antd'
import GlobalStyle, { Container } from '../globalStyles'

const { Header, Sider } = Layout;

function Main(){
  const [googleId, setGoogleId ] = useState(null)

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
      <Topbar googleId={googleId} setGoogleId={setGoogleId} />
    </Header>
    <Switch>
    <Route exact path="/detail/:id">
      <Container>
        <GlobalStyle />
        <Detail />
      </Container>
    </Route>
    <Route exact path="/my">
      <Container>
        <GlobalStyle />
        <My />
      </Container>
    </Route>
    <Route path="/" render={() =>
        <Layout hasSider={true}>
        <Sider>
          <Searchbar funcs={funcs} filterData={filterData} />
        </Sider>
        <Content filterData={filterData} />
      </Layout>
    } />
    </Switch>
    </Layout>
  )
}

export default Main;