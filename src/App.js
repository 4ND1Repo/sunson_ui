import React from 'react';
import FormComponent from './components/FormComponent';
import ListComponent from './components/ListComponent';
import { Container } from "reactstrap";

function App() {
  return (
    <div className="App">
      <Container >
        <FormComponent />
        <ListComponent />
      </Container>
    </div>
  );
}

export default App;
