import React from "react";
import Select from "./Select";
import Input from "./Input";
import Panel from "./Panel";
import Main from "./Main";
import Form from "./Form";
import Header from "./Header";
import Footer from "./Footer";


function App() {
  return (
    <React.Fragment>
      
      <Header />
      <Main>
        <Form>
          <Panel
            body={
              <React.Fragment>
                <Input />
                <Select />
              </React.Fragment>
            }
          />
          <Panel
            body={
              <React.Fragment>
                <Input />
                <Select />
              </React.Fragment>
            }
          />
        </Form>
      </Main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
