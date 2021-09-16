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
                <Searchbar />
              </Sider>
              <Content />
            </Layout>
          )}
        />
      </Switch>
    </Layout>
  );
}

export default Main;
