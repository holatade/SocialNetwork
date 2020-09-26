import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActvityDashboard from "../../features/actvities/dashboard/ActvityDashboard";
import NavBar from "../../features/nav/NavBar";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import ActivityForm from "../../features/actvities/form/ActivityForm";
import HomePage from "../../features/home/HomePage";
import ActivityDetails from "../../features/actvities/details/ActivityDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/activities" component={ActvityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                key={location.key}
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
              />
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};
export default withRouter(observer(App));
