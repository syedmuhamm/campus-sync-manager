import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import ProtectedRoute from './routes/protectedRoute';
import SignUp from 'views/auth/signIn/signup';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <HashRouter>
          <Switch>
            <Route path="/auth/sign-in" component={AuthLayout} />
            <Route path="/auth/sign-up" component={SignUp} />
            <ProtectedRoute path="/admin" component={AdminLayout} />
            <ProtectedRoute path="/rtl" component={RtlLayout} />
            <Redirect exact from="/" to="/admin" />
            <Redirect to="/auth/sign-in" />
          </Switch>
        </HashRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);
