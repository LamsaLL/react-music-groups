import React from "react";
import { Tab } from "semantic-ui-react";

const panes = [
  { menuItem: "Musiciens", render: () => <Tab.Pane>Musiciens</Tab.Pane> },
  { menuItem: "Groupes", render: () => <Tab.Pane>Groupes</Tab.Pane> },
];

const MusicTab = () => <Tab panes={panes} />;

export default MusicTab;
