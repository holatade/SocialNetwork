import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { ActivityFormValues, IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/forms/TextInput";
import TextAreaInput from "../../../app/common/forms/TextAreaInput";
import SelectInput from "../../../app/common/forms/SelectInput";
import { category } from "../../../app/common/options/CategoryOptions";
import DateInput from "../../../app/common/forms/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";
import {combineValidators, composeValidators, hasLengthGreaterThan, isRequired} from 'revalidate';
import { RootStoreContext } from "../../../app/stores/rootStore";


const validate = combineValidators({
  title: isRequired({message:'The event title is required'}),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({message:'Descrption needs to be at least 5 characters'})
  )(),
  city:isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
  time: isRequired('Time')
})

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    submitting,
    loadActivity,
    createActivity,
    editActivity
  } = rootStore.activityStore;
  

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    //! This will give us a date, time and activity omitting date
    const { date, time, ...activity } = values;
    //!This will set the value of date in the activity
    activity.date = dateAndTime;
    if (!activity.id) {
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
  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading , setLoading] = useState(false);


  //? Note the useEffect runs when this component rerenders, however it runs when loadActivity or match.params.id has changed
  useEffect(() => {
    //This check if the theres is an Id in match.params and the initial activity ID is an empty string.
    //wen we click on the edit activity detail button, we check for the id in the match.params and also chech that the initial activity
    //Id is an empty string. This done cause after submitting a form, since we redirecting to activity details, the activity detail also
    //have a match.params.id and this cause the load activity to be called again, to stop thos from happening we add the activity.id
    //.length check to stop it from happening.
    // && activity.id
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id).then((activity) => {
        setActivity(new ActivityFormValues(activity));
      }).finally(() => setLoading(false));
    }
  }, [
    loadActivity,
    match.params.id,
  ]);

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
          validate={validate}
          initialValues ={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit,invalid,pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  placeholder="Title"
                  name="title"
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  placeholder="Description"
                  name="description"
                  rows={3}
                  value={activity.description}
                  component={TextAreaInput}
                />
                <Field
                  placeholder="Category"
                  name="category"
                  options={category}
                  value={activity.category}
                  component={SelectInput}
                />
                <Form.Group widths="equal">
                  <Field
                    placeholder="Date"
                    name="date"
                    date={true}
                    value={activity.date}
                    component={DateInput}
                  />
                  <Field
                    placeholder="Time"
                    name="time"
                    time={true}
                    value={activity.date}
                    component={DateInput}
                  />
                </Form.Group>

                <Field
                  placeholder="City"
                  name="city"
                  value={activity.city}
                  component={TextInput}
                />
                <Field
                  placeholder="Venue"
                  name="venue"
                  value={activity.venue}
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={activity.id ? () => history.push(`/activities/${activity.id}`) : () => history.push("/activities") }
                  disabled={loading}
                  floated="right"
                  type="buttom"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
