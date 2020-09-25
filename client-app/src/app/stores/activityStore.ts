import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/activity";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined = undefined;
  @observable editMode = false;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action
  loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction("loading activities", () => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading activities error", () => {
        this.loadingInitial = false;
        console.log(error);
      });
    }
  };

  //This handle the create activity , we set or change the set of the former activity array by using a spread operator to addd a
  //new activity, we set the new selected activity to the passed created activity and set edit  mode to false,
  //to see the activity details
  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction("creating activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.editMode = false;
        this.submitting = false;
        this.selectedActivity = activity;
      });
    } catch (error) {
      runInAction("create activity error", () => {
        this.submitting = false;
        console.log(error);
      });
    }
  };

  //This handle the edit activity function , we filter the previous activity and remove the activity which match the activity we wanna
  //edit from the array. with the spread operator we then pass the activity object value to the filtered activity array
  // we set the new selected activity to the passed created activity and set edit  mode to false, to see the activity details
  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction("editting an activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("edit activity error", () => {
        this.submitting = false;
        console.log(error);
      });
    }
  };

  // This handle the delete activity functionality, use a spread operetor to get  all activities which id is nt equal to the id of activity
  //we want to delete
  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.target = event.currentTarget.name;
    this.submitting = true;
    try {
      await agent.Activities.delete(id);
      runInAction("deleting activity", () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("delete activity error", () => {
        this.submitting = false;
        this.target = "";
        console.log(error);
      });
    }
  };

  // we use this to get a selected activity out of the activity array. we filter the array by the id of the selected activity, this
  //return back an activity and also wen we do this we set edit mode to false.
  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  };

  // This takes the selected activity via id and the set the edit mode to true,
  @action openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  };

  // this is used to close the activity detail
  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  //this cancels the edit/create form
  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  //We use this to handle when the form to create an activity should bve open, we first set the selected activity to null, this will
  //remove any selected activity, we then set the edit mode to true, this wll render the form to edit.
  //! This fuctionality is mainly used in the NavBAr to render the create activity form
  @action openCreateForm = () => {
    this.selectedActivity = undefined;
    this.editMode = true;
  };
}

export default createContext(new ActivityStore());
