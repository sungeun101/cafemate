import axios from 'axios';
import '../styles/Main.css';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Searchbar from '../components/Searchbar';
import Content from '../components/Content';
import Detail from '../pages/Detail/Detail';
import My from '../pages/My/My';
import { Layout } from 'antd';
import GlobalStyle, { Container } from '../globalStyles';

const { Header, Sider } = Layout;

function Main() {
  const [googleId, setGoogleId] = useState(
    window.localStorage.getItem('googleId')
  );
  const [googleName, setGoogleName] = useState(
    window.localStorage.getItem('googleName')
  );
  const [googleImg, setGoogleImg] = useState(
    window.localStorage.getItem('googleImg')
  );

  const userInfo = { googleId, googleName, googleImg };

  useEffect(() => {
    setGoogleId(window.localStorage.getItem('googleId'));
    setGoogleName(window.localStorage.getItem('googleName'));
    setGoogleImg(window.localStorage.getItem('googleImg'));
  }, [googleId, googleName, googleImg]);

  const [cafeData, setCafeData] = useState([]);

  const [price, setPrice] = useState(0);
  const [rate, setRate] = useState(0);
  const [address1, setAddress1] = useState(null);
  const [address2, setAddress2] = useState(null);
  const [address3, setAddress3] = useState(null);
  const [tags, setTags] = useState([]);

  const funcs = {
    setCafeData,
    setPrice,
    setRate,
    setAddress1,
    setAddress2,
    setAddress3,
    setTags,
  };
  const filterData = {
    price,
    rate,
    address1,
    address2,
    address3,
    tags,
  };

  return (
    <Layout>
      <Header>
        <Topbar
          userInfo={userInfo}
          setGoogleId={setGoogleId}
          setGoogleName={setGoogleName}
          setGoogleImg={setGoogleImg}
        />
      </Header>
      <Switch>
        <Route exact path="/detail/:id">
          <Container>
            <GlobalStyle />
            <Detail userInfo={userInfo} />
          </Container>
        </Route>
        <Route exact path="/my">
          <Container>
            <GlobalStyle />
            <My userInfo={userInfo} />
          </Container>
        </Route>
        <Route
          path="/"
          render={() => (
            <Layout hasSider={true}>
              <Sider>
                <Searchbar funcs={funcs} filterData={filterData} />
              </Sider>
              <Content cafeData={cafeData} />
            </Layout>
          )}
        />
      </Switch>
    </Layout>
  );
}

export default Main;
