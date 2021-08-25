import React from 'react';
import { Redirect, Route, BrowserRouter, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import GlobalStyle, { Container } from './globalStyles';
import Detail from './pages/Detail/Detail';
import Main from './pages/Main';
import My from './pages/My/My';

function App() {
  return (
    <Container>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/detail/:id">
            <Detail />
          </Route>
          <Route exact path="/my">
            <My />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
