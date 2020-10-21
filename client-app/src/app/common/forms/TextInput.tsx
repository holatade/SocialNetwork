import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const TextInput: React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error },
}) => {
  // Doing this !!error wud make the error return a boolean if the field is tocuhed and it has an error
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      {/* //? we spread the input property in the input field to get all the properties inside the input property
      //? Note, the input property is passed from the react-final-form FIELD, and wat this provides is an OnChnage handler, 
      //? On-blur handler and also 
      //! Maybe he value of the input as well. This all passed into our input field */}
      <input type="text" {...input} placeholder={placeholder} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
