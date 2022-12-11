import { createGlobalStyle } from "styled-components";
import background from "./img/currencyBackground.jpg";

export const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
}

*,
::after,
::before {
  box-sizing: inherit;
}

.body {
  font-family: Arial;
  background-color: #8d99ae;
  max-width: 1000px;
  margin: 0 auto;
  background-image: url("${background}");
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
}
`;	