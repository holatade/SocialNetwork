import React, { useContext } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityList from "./ActivityList";
import ActivityStore from "../../../app/stores/activityStore";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

const ActvityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { editMode, selectedActivity } = activityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <GridColumn width={6}>
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && (
          <ActivityForm
            //? done to change the key of the selected activity to cause a state change
            key={(selectedActivity && selectedActivity.id) || 0}
            activity={selectedActivity!}
          />
        )}
      </GridColumn>
    </Grid>
  );
};

export default observer(ActvityDashboard);
