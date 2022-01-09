import React, { useState, useEffect, useMemo } from "react";
import { Container, Form, Modal, Button, Dropdown } from "semantic-ui-react";

const GroupForm = ({ buttonTrigger, id }) => {
  const [group, setGroup] = useState(undefined);
  const [musicians, setMusicians] = useState([]);

  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id !== undefined) {
      const formData = new FormData(e.target);
      const group = {
        name: formData.get("name"),
        image: formData.get("image"),
        description: formData.get("description"),
      };

      fetch(`http://localhost:3001/group/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(group),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));

      setOpen(false);
    } else {
      const formData = new FormData(e.target);
      const group = {
        name: formData.get("name"),
        image: formData.get("image"),
        description: formData.get("description"),
      };

      fetch("http://localhost:3001/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(group),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));

      setOpen(false);
    }
  };

  // If id is defined we fetch the group with the id
  useEffect(() => {
    if (id !== undefined) {
      fetch(`http://localhost:3001/group/${id}`)
        .then((response) => response.json())
        .then((data) => setGroup(data));
    }
  }, [id]);

  // Get all musicians
  useEffect(() => {
    fetch("http://localhost:3001/musicians")
      .then((response) => response.json())
      .then((data) => setMusicians(data.filter((x) => x)));
  }, []);

  console.log(musicians);

  return (
    <>
      <Container>
        <Form>
          <Modal
            as={Form}
            onSubmit={handleSubmit}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={buttonTrigger}
          >
            <Modal.Header>
              {id !== undefined ? "Modifier un groupe" : "Ajouter un groupe"}
            </Modal.Header>
            <Modal.Content>
              <Form.Input
                fluid
                name="name"
                label="Nom"
                placeholder={group ? group.name : "Entrez un nom de groupe"}
                required={true}
                id="form-input-first-name"
              />
              <Form.Input
                fluid
                name="image"
                label="Image"
                placeholder={group ? group.image : "Choisissez une image"}
                required={true}
              />
              <Form.Input
                fluid
                name="description"
                label="Description"
                placeholder={
                  group ? group.description : "Choisissez une description"
                }
                required={true}
              />
              <Form.Dropdown
                fluid
                selection
                name="musicians"
                label="Musiciens"
                multiple
                placeholder={"Choisissez un ou plusieurs musiciens"}
                options={musicians.map((musician) => ({
                  key: musician.id,
                  text: musician.nickname,
                  value: musician.id,
                }))}
              />
            </Modal.Content>
            <Modal.Actions>
              <Button type="submit" content="Sauvegarder" />
            </Modal.Actions>
          </Modal>
        </Form>
      </Container>
    </>
  );
};

export default GroupForm;
