import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img
            src="/assets/logo.png"
            alt="log0"
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} exact to="/activities" />
        <Menu.Item as={NavLink} exact to="/createActivity">
          <Button positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
