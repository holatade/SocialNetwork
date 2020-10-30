import React from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import TextAreaInput from "../../app/common/forms/TextAreaInput";
import TextInput from "../../app/common/forms/TextInput";
import { IProfile } from "../../app/models/profile";

interface IProps {
  profile: IProfile;
  editProfile: (profile: IProfile) => void;
}

const validate = combineValidators({
  displayName: isRequired({ message: "The display name is required" }),
});

const ProfileEditForm: React.FC<IProps> = ({ profile, editProfile }) => {
  return (
    <Grid.Column width={16}>
      <FinalForm
        validate={validate}
        initialValues={profile!}
        onSubmit={editProfile}
        render={({ handleSubmit, invalid, pristine, submitting }) => (
          <Form onSubmit={handleSubmit} error>
            <Field
              placeholder="Display Name"
              name="displayName"
              value={profile!.displayName}
              component={TextInput}
            />
            <Field
              placeholder="Bio"
              name="bio"
              rows={3}
              value={profile!.bio}
              component={TextAreaInput}
            />
            <Button
              loading={submitting}
              disabled={invalid || pristine}
              floated="right"
              positive
              content="Update profile"
            />
          </Form>
        )}
      />
    </Grid.Column>
  );
};

export default ProfileEditForm;
