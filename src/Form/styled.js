import styled, { css } from "styled-components";

export const StyledForm = styled.form`
    color: rgb(55, 0, 255);
    border: none;
`;

export const StyledSection = styled.section`
    color: white;
    background-color: #2b2d42;
    font-size: 30px;
    max-width: 544px;
    width: 100%;
    height: 80px;
    margin: 0 auto;
    padding: 25px 0;
    font-family: 'Rajdhani', sans-serif;
    font-weight: bold;
    border-radius:	20px 20px 0px 0px;
    

    ${(props) => props.bottom && css`
        display: flex;
        gap: 25px;
        margin: 0 auto;
        justify-content: center;
        margin-block-start: 7px;
        margin-block-end: 0px;
        margin-inline-start: 228px;
        margin-inline-end: 110px;
        font-size: 20px;
        padding: 30px 0;
        border-radius:	0px 0px 20px 20px;
        
        @media (max-width: 1000px){
    display: none;
    };`
  }




`;

export const StyledFieldset = styled.fieldset`
    text-align: center;
    margin: -12px auto;
    border: none;
`;

export const StyledSpinner = styled.div`
  ${(props) => !props.display && css`
        display: none;`
  }

  @media (max-width: 1000px){
    display: none;
    };
    
  margin: -2px; 
  height: 25px;
  width: 25px;
  border: 10px solid white;
  border-radius: 50%;
  border-top-color: transparent;
  border-bottom-color: transparent;
  animation: spin 0.8s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg) scale(1.2);
    }
    100% {
      transform: rotate(360deg);
    }
  }
    
`;
