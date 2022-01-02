import React from "react";
import MusiciansItem from "../MusiciansItem/MusiciansItem.jsx";
import MusicianForm from "../MusicianForm/MusicianForm.jsx";
import { Tab, Button, Modal, Form, Container } from "semantic-ui-react";

const panes = [
  {
    menuItem: "Musiciens",
    render: () => {
      const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const musician = {
          id: "null",
          nickname: formData.get("nickname"),
          image: formData.get("image"),
          speciality: "test",
        };
        console.log("ddas" + JSON.stringify(musician));

        fetch("http://localhost:3001/musician", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(musician),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
      };

      return (
        <Tab.Pane>
          <h1>Musiciens</h1>
          <Container>
            <Form>
              <Modal
                as={Form}
                onSubmit={handleSubmit}
                trigger={<Button floated="right">Ajouter</Button>}
              >
                <Modal.Header>Ajouter un musicien</Modal.Header>
                <Modal.Content>
                  <MusicianForm />
                </Modal.Content>
                <Modal.Actions>
                  <Button type="submit" content="Sauvegarder" />
                </Modal.Actions>
              </Modal>
            </Form>
          </Container>
          <MusiciansItem></MusiciansItem>
        </Tab.Pane>
      );
    },
  },
  { menuItem: "Groupes", render: () => <Tab.Pane>Groupes</Tab.Pane> },
];

const MusicTab = () => <Tab panes={panes} />;

export default MusicTab;
