import React from "react";
import { FieldRenderProps } from "react-final-form";
import { Form, FormFieldProps, Label } from "semantic-ui-react";
import { DateTimePicker } from "react-widgets";

interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

const DateInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  meta: { touched, error },
  date = false,
  time = false,
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <DateTimePicker
        value={input.value || null}
        onChange={input.onChange}
        onBlur={input.onBlur}
        onKeyDown={(e) => e.preventDefault()}
        date={date}
        time={time}
        placeholder={placeholder}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
