import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";
import ActvityDashboard from "../../features/actvities/dashboard/ActvityDashboard";
import NavBar from "../../features/nav/NavBar";

const App = () => {
  const activityStore = useContext(ActivityStore);

  //? we use this to make a call to fetch the activites from our API, we then set the activity after the fetch from our API
  //? Note, the emoty array keeps us from running an infinite fetch call
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading activities..." />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActvityDashboard />
      </Container>
    </Fragment>
  );
};
export default observer(App);
