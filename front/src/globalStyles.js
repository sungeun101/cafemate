import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
      --main-color: #dba56c;
      --black-color: #20110b;
      --light-grey-color: #f3f2f0;
      --grey-color: #dcdcdc;
      --yellow-color: #FFC700; 
    }
    * {
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family: 'Open Sans', sans-serif;
        color:var(---black-color)
    }
    .fa-heart{
      color: #C92D40;
      font-size:1.5rem;
    }
    .fa-star{
      margin-right:0.2vw;
      &:last-child{
        margin-right:0;
      }
    }
    h1 {
      font-size:1.5rem;
      font-weight:700;
    }
`;

export const Container = styled.div`
  margin: 5vh 10vw;
`;
export const InfoWrapper = styled.div`
  margin-bottom: 3rem;
`;
export default GlobalStyle;
