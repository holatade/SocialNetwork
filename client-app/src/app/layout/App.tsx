import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActvityDashboard from "../../features/actvities/dashboard/ActvityDashboard";
import NavBar from "../../features/nav/NavBar";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import ActivityForm from "../../features/actvities/form/ActivityForm";
import HomePage from "../../features/home/HomePage";
import ActivityDetails from "../../features/actvities/details/ActivityDetails";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/activities" component={ActvityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};
export default withRouter(observer(App));
