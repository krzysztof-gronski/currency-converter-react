import React,{useState} from "react";
import Main from "./Main";
import Form from "./Form";
import Header from "./Header";
import Footer from "./Footer";
import {currencies,rates} from "./currencies";


function App() {
  const [result,setResult] = useState();
  const calculateResult = () =>{

  };

  return (
    <React.Fragment>
      
      <Header />
      <Main>
        <Form currencies={currencies} rates={rates}>
        </Form>
      </Main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
