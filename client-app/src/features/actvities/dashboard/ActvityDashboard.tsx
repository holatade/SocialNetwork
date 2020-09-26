import React, { useContext, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityList from "./ActivityList";
import ActivityStore from "../../../app/stores/activityStore";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

const ActvityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);

  //? we use this to make a call to fetch the activites from our API, we then set the activity after the fetch from our API
  //? Note, the emoty array keeps us from running an infinite fetch call
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading activities..." />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <GridColumn width={6}>
        <h2>Activity filters</h2>
      </GridColumn>
    </Grid>
  );
};

export default observer(ActvityDashboard);
