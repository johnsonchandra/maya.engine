import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import $ from 'jquery';
import 'jquery-validation';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { getInputValue } from '/imports/modules/get-input-value';

let component;

const login = () => {
  const email = getInputValue(component.refs.emailAddress);
  const password = getInputValue(component.refs.password);

  Meteor.loginWithPassword(email, password, (error) => {
    if (error) {
    	component.setState({isLoading:false});
      Bert.alert(error.reason, 'warning');
    } else {
      Meteor.call('memberLogin', function(error,result){
        if(error){
          component.setState({isLoading:false});
          Meteor.logout();
          Bert.alert(error.message+', please contact helpdesk of '+Meteor.settings.public.tenant,'danger');
        }else{
          Bert.alert('Logged in!', 'success');
          Session.delete('nextPathname');
          const { location } = component.props;
          if (location.state && location.state.nextPathname) {
            browserHistory.push(location.state.nextPathname);
          } else {
            browserHistory.push('/');
          };
        };
      });
    }
  });
};

const validate = () => {
  $(component.refs.login).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
      },
    },
    messages: {
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?',
      },
      password: {
        required: 'Need a password here.',
      },
    },
    submitHandler() { login(); },
  });
};

const handleLogin = (options) => {
  component = options.component;
  validate();
};

export class Login extends React.Component {
  componentDidMount() {
    handleLogin({ component: this });
    if (this.props.location.state && this.props.location.state.nextPathname)
    	Session.set('nextPathname', this.props.location.state.nextPathname);
    else
    	Session.delete('nextPathname');
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return <Grid>
      <Row>
        <Col xs={ 12 } sm={ 6 } md={ 4 }>
          <h4 className="page-header">Login</h4>
          <form ref="login" className="login" onSubmit={ this.handleSubmit }>
            <FormGroup>
              <ControlLabel>Email Address</ControlLabel>
              <FormControl
                type="email"
                ref="emailAddress"
                name="emailAddress"
                placeholder="Email Address"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>
                <span className="pull-left">Password</span>
                <Link className="pull-right" to="/recover-password">Forgot Password?</Link>
              </ControlLabel>
              <FormControl
                type="password"
                ref="password"
                name="password"
                placeholder="Password"
              />
            </FormGroup>
            <Button type="submit" bsStyle="success">Login</Button>
            <br/><br/>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link>.</p>
          </form>
        </Col>
      </Row>
    </Grid>;
  }
}
