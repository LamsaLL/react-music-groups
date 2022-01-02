import React, { useState } from "react";
import { Tab, Button, Modal, Form, Container } from "semantic-ui-react";
import MusicianForm from "../MusicianForm/MusicianForm.jsx";
import MusiciansItem from "../MusiciansItem/MusiciansItem.jsx";
import GroupForm from "../GroupForm/GroupForm.jsx";
import GroupsItem from "../GroupsItem/GroupsItem.jsx";

const panes = [
  {
    menuItem: "Musiciens",
    render: () => {
      return (
        <Tab.Pane>
          <h1>Musiciens</h1>
          <MusicianForm
            buttonTrigger={<Button floated="right">Ajouter</Button>}
          />
          <MusiciansItem></MusiciansItem>
        </Tab.Pane>
      );
    },
  },
  {
    menuItem: "Groupes",
    render: () => (
      <Tab.Pane>
        <h1>Groupes</h1>
        <GroupForm
          buttonTrigger={<Button floated="right">Ajouter</Button>}
        ></GroupForm>
        <GroupsItem></GroupsItem>
      </Tab.Pane>
    ),
  },
];

const MusicTab = () => <Tab panes={panes} />;

export default MusicTab;
