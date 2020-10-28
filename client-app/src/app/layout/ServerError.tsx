import React from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ServerError = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="user" />
        Oops - This on us we will fix ASAP.
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/activities" primary>
          Return to Activities page
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default ServerError;
