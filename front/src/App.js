import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
// import React, { useState } from 'react';
// import {
//   Redirect,
//   Route,
//   BrowserRouter as Router,
//   Switch,
// } from 'react-router-dom';
// import NotFound from './pages/NotFound';
// import 'antd/dist/antd.css';
// import GlobalStyle, { Container } from './globalStyles';
// import Detail from './pages/Detail';
// import Main from './pages/Main';

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
    // <>
    //   <div className="App">
    //     <Container>
    //       <Router>
    //         <GlobalStyle />
    //         <Switch>
    //           <Route exact path="/mainnnnn">
    //             <Main />
    //           </Route>
    //           <Route exact path="/detail/:id">
    //             <Detail />
    //           </Route>
    //           <Route>
    //             <NotFound />
    //           </Route>
    //           <Route>
    //             <Redirect to="/" />
    //           </Route>
    //         </Switch>
    //       </Router>
    //     </Container>
    //   </div>
    // </>
  );
}

export default App;
