import React from "react";
import { Tab, Button } from "semantic-ui-react";
import MusicianForm from "../MusicianForm/MusicianForm.jsx";
import MusiciansItem from "../MusiciansItem/MusiciansItem.jsx";
import GroupForm from "../GroupForm/GroupForm.jsx";
import GroupsItem from "../GroupsItem/GroupsItem.jsx";

const panes = [
  {
    menuItem: "Musiciens",
    render: () => {
      const admin = localStorage.getItem("admin");
      return (
        <Tab.Pane>
          <h1>Musiciens</h1>
          {admin ? (
            <MusicianForm
              buttonTrigger={<Button floated="right">Ajouter</Button>}
            />
          ) : null}

          <MusiciansItem></MusiciansItem>
        </Tab.Pane>
      );
    },
  },
  {
    menuItem: "Groupes",
    render: () => {
      const admin = localStorage.getItem("admin");

      return (
        <Tab.Pane>
          <h1>Groupes</h1>
          {admin ? (
            <GroupForm
              buttonTrigger={<Button floated="right">Ajouter</Button>}
            ></GroupForm>
          ) : null}
          <GroupsItem></GroupsItem>
        </Tab.Pane>
      );
    },
  },
];

const MusicTab = () => <Tab panes={panes} />;

export default MusicTab;
