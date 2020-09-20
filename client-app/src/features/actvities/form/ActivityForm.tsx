import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  submitting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  createActivity,
  editActivity,
  submitting,
  //?We put a : initialFormState here to change the name to initialFormstate instead of activity
  activity: intialFormState,
}) => {
  // This sets the initial value of activity to the form. If the activity prop is null we set the properties
  //in the activity to an empty string else we return the activity
  const initializeForm = () => {
    if (intialFormState) {
      return intialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

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
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  //? with this set the state of the activity by calling the initialize form fucnction
  const [activity, setActivity] = useState<IActivity>(initializeForm);

  return (
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
          onClick={() => setEditMode(false)}
          floated="right"
          type="buttom"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
