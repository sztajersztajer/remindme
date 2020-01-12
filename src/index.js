import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import WizardForm from "./WizardForm";
import { Container, Grid, Segment } from 'semantic-ui-react'

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
    <Container>
      <Grid columns='equal'>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column width={8}>
          <Segment>
            <WizardForm onSubmit={()=> {}}/>
          </Segment>
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>  
      </Grid>
    </Container>
    </div>
  </Provider>,
  rootEl
);
