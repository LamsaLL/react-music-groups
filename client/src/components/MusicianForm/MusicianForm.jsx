import React, { useState } from "react";
import { Container, Form, Modal, Button, Dropdown } from "semantic-ui-react";

const MusicianForm = () => {
  const specialityOptions = [
    { key: "guitarrist", text: "Guitariste", value: "guitariste" },
    { key: "bassist", text: "Bassiste", value: "bassiste" },
    { key: "singer", text: "Chanteur", value: "chanteur" },
    { key: "vocalist", text: "Vocaliste", value: "vocaliste" },
    { key: "composer", text: "Compositeur", value: "compositeur" },
  ];

  const [specialityValue, setValue] = useState(specialityOptions[0].value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData.get("speciality"));
    const musician = {
      id: "null",
      nickname: formData.get("nickname"),
      image: formData.get("image"),
      //get speciality value from dropdown
      speciality: specialityValue,
    };
    // Affiche les valeurs
    console.log(musician);
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
    <>
      <Container>
        <Form>
          <Modal
            as={Form}
            onSubmit={handleSubmit}
            trigger={<Button floated="right">Ajouter</Button>}
          >
            <Modal.Header>Ajouter un musicien</Modal.Header>
            <Modal.Content>
              <Form.Input
                fluid
                name="nickname"
                label="Surnom"
                placeholder="Entrez un surnom"
                required={true}
                id="form-input-first-name"
              />
              <Form.Input
                fluid
                name="image"
                label="Image"
                placeholder="Choisissez une image"
                required={true}
              />
              <Form.Dropdown
                fluid
                selection
                name="speciality"
                label="Specialité"
                placeholder="Choisissez une spécialité"
                required={true}
                options={specialityOptions}
                onChange={(e, { value }) => setValue(value)}
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

export default MusicianForm;
