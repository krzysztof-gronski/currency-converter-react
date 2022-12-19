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
        margin-block-start: 7px;
        margin-block-end: 0px;
        margin-inline-start: 228px;
        margin-inline-end: 110px;
        font-size: 20px;
        padding: 30px 0;
        border-radius:	0px 0px 20px 20px;`
    }
`;

export const StyledFieldset = styled.fieldset`
    text-align: center;
    margin: -12px auto;
    border: none;
`;
