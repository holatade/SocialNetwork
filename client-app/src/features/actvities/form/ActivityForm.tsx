import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: intialFormState,
    loadActivity,
    clearActivity,
  } = activityStore;
  // This sets the initial value of activity to the form. If the activity prop is null we set the properties
  //in the activity to an empty string else we return the activity

  //onChange for input is a type React.ChangeEvent<HTMLInputElement> but onChnage for a TextArea is React.FormEvent<HTMLTextAreaElememt>
  //To accomodate for type of event we use React.ChangeEvent<HTMLInputElement> and  FormEvent<HTMLTextAreaElement>
  //when the event is form event instead of changeevent the target of the value or name now becomes event.currentTraget instead of event
  //.target
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity: IActivity = {
        ...activity,
        //? install the package uuid to get access to GUID (npm install uuid) and then (npm install @types/uuid) to get they types
        id: uuid(),
      };
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      editActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  };

  //? with this set the state of the activity by calling the initialize form fucnction
  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    //This check if the theres is an Id in match.params and the initial activity ID is an empty string.
    //wen we click on the edit activity detail button, we check for the id in the match.params and also chech that the initial activity
    //Id is an empty string. This done cause after submitting a form, since we redirecting to activity details, the activity detail also
    //have a match.params.id and this cause the load activity to be called again, to stop thos from happening we add the activity.id
    //.length check to stop it from happening.
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(() => {
        intialFormState && setActivity(intialFormState);
      });
    }
    // When component unmount , the acivity will be set to null
    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    intialFormState,
    match.params.id,
    clearActivity,
    activity.id.length,
  ]);

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              onChange={handleInputChange}
              placeholder="Title"
              name="title"
              value={activity.title}
            />
            <Form.TextArea
              rows={2}
              placeholder="Description"
              onChange={handleInputChange}
              name="description"
              value={activity.description}
            />
            <Form.Input
              placeholder="Category"
              onChange={handleInputChange}
              name="category"
              value={activity.category}
            />
            <Form.Input
              type="datetime-local"
              placeholder="Date"
              onChange={handleInputChange}
              name="date"
              value={activity.date}
            />
            <Form.Input
              placeholder="City"
              onChange={handleInputChange}
              name="city"
              value={activity.city}
            />
            <Form.Input
              placeholder="Venue"
              onChange={handleInputChange}
              name="venue"
              value={activity.venue}
            />
            <Button
              loading={submitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              onClick={() => history.push("/activities")}
              floated="right"
              type="buttom"
              content="Cancel"
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
