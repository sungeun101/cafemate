import axios from "axios";
import '../styles/Main.css';
import React, { useState , useEffect } from 'react';
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
  const [googleId, setGoogleId] = useState(null);
  const [googleName, setGoogleName] = useState(null)
  const [googleImg, setGoogleImg] = useState(null)

  const userInfo = { googleId, googleName, googleImg }

  const [cafeData, setCafeData] = useState([])

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

  const cafe = {
    id: 1,
    name: '카페 일',
    img_path:
      'https://blog.kakaocdn.net/dn/zRTMr/btqW4iEwRTw/fULNvoGxM6kOIkE04dSK9K/img.jpg',
    latitude: 89.584991,
    longitude: 95.18178,
    phone: '010-0000-0000',
    time: '09:00~24:00',
    star: 5,
    menu: '아메리카노(HOT, ICE):3,500/카페민트:4,500/딸기라떼:5,500/민트초코라떼:5,000',
  };
  useEffect(() => {
    axios.get("/cafes?dong=삼양동&filtering=dessert&sorting=star").then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  });
  return (
    <Layout>
      <Header>
        <Topbar userInfo={userInfo} setGoogleId={setGoogleId} setGoogleName={setGoogleName} setGoogleImg={setGoogleImg} />
      </Header>
      <Switch>
        <Route exact path="/detail/:id">
          <Container>
            <GlobalStyle />
            <Detail cafe={cafe} />
          </Container>
        </Route>
        <Route exact path="/my">
          <Container>
            <GlobalStyle />
            <My />
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
