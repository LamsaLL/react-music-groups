import React, { useState } from "react";
import MusicianForm from "../MusicianForm/MusicianForm.jsx";
import { Tab, Button, Modal, Form, Container } from "semantic-ui-react";
import MusiciansItem from "../MusiciansItem/MusiciansItem.jsx";
const panes = [
  {
    menuItem: "Musiciens",
    render: () => {
      const handleChange = () => {};

      return (
        <Tab.Pane>
          <h1>Musiciens</h1>
          <MusicianForm />
          <MusiciansItem></MusiciansItem>
        </Tab.Pane>
      );
    },
  },
  { menuItem: "Groupes", render: () => <Tab.Pane>Groupes</Tab.Pane> },
];

const MusicTab = () => <Tab panes={panes} />;

export default MusicTab;
