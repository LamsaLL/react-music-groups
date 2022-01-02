import React from "react";
import { Tab } from "semantic-ui-react";
import MusiciansItem from "../MusiciansItem/MusiciansItem.jsx";

const panes = [
  {
    menuItem: "Musiciens",
    render: () => (
      <Tab.Pane>
        Musiciens
        <MusiciansItem></MusiciansItem>
      </Tab.Pane>
    ),
  },
  { menuItem: "Groupes", render: () => <Tab.Pane>Groupes</Tab.Pane> },
];

const MusicTab = () => <Tab panes={panes} />;

export default MusicTab;
