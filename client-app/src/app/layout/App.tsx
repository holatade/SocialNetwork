import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActvityDashboard } from "../../features/actvities/dashboard/ActvityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  // we use this to get a selected activity out of the activity array. we filter the array by the id of the selected activity, this
  //return back an activity and also wen we do this we set edit mode to false.
  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  //We use this to handle when the form to create an activity should bve open, we first set the selected activity to null, this will
  //remove any selected activity, we then set the edit mode to true, this wll render the form to edit.
  //! This fuctionality is mainly used in the NavBAr to render the create activity form
  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  //This handle the create activity , we set or change the set of the former activity array by using a spread operator to addd a
  //new activity, we set the new selected activity to the passed created activity and set edit  mode to false,
  //to see the activity details
  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  //This handle the edit activity function , we filter the previous activity and remove the activity which match the activity we wanna
  //edit from the array. with the spread operator we then pass the activity object value to the filtered activity array
  // we set the new selected activity to the passed created activity and set edit  mode to false, to see the activity details
  const handleEditActivity = (activity: IActivity) => {
    setActivities([
      ...activities.filter((a) => a.id !== activity.id),
      activity,
    ]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  // This handle the delete activity functionality, use a spread operetor to get  all activities which id is nt equal to the id of activity
  //we want to delete
  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter((a) => a.id !== id)]);
  };

  //? we use this to make a call to fetch the activites from our API, we then set the activity after the fetch from our API
  //? Note, the emoty array keeps us from running an infinite fetch call
  useEffect(() => {
    axios
      .get<IActivity[]>("https://localhost:5001/api/activities")
      .then((response) => {
        let activities: IActivity[] = [];
        response.data.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        });
        setActivities(activities);
      });
  }, []);

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActvityDashboard
          activities={activities}
          selectActivity={handleSelectedActivity}
          selectedActivity={selectedActivity!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity!}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
};
export default App;
