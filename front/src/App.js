import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
// import React from 'react';
// import 'antd/dist/antd.css';
// import GlobalStyle, { Container } from './globalStyles';
// import Detail from './pages/Detail';

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>

    // function App() {
    //   return (
    //     <>
    //       <GlobalStyle />
    //       <Container>
    //         <div className="App">
    //           <Detail />
    //         </div>
    //       </Container>
    //     </>
  );
}

export default App;
