import React from 'react';
import 'antd/dist/antd.css';
import GlobalStyle, { Container } from './globalStyles';
import Detail from './pages/Detail';

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <div className="App">
          <Detail />
        </div>
      </Container>
    </>
  );
}

export default App;
