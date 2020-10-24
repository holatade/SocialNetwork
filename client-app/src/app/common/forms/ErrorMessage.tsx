import { AxiosResponse } from "axios";
import React from "react";
import { Message } from "semantic-ui-react";

interface IProps {
  error: AxiosResponse;
  text?: string;
}

const ErrorMessage: React.FC<IProps> = ({ error }) => {
  return (
    <Message error>
      <Message.Header>{error.status}</Message.Header>
      {error.data && Object.keys(error.data.errors).length > 0 && (
        <Message.List>
          {Object.values(error.data.errors)
            .flat()
            .map(
              (err: any, i) => err && <Message.Item Key={i}>{err}</Message.Item>
            )}
        </Message.List>
      )}
    </Message>
  );
};

export default ErrorMessage;
