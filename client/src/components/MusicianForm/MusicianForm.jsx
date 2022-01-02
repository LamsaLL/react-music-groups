import React, { useState, useEffect, useMemo } from "react";
import { Container, Form, Modal, Button, Dropdown } from "semantic-ui-react";

const MusicianForm = ({ buttonTrigger, id }) => {
  const specialityOptions = [
    { key: "guitarrist", text: "Guitariste", value: "guitariste" },
    { key: "bassist", text: "Bassiste", value: "bassiste" },
    { key: "singer", text: "Chanteur", value: "chanteur" },
    { key: "vocalist", text: "Vocaliste", value: "vocaliste" },
    { key: "composer", text: "Compositeur", value: "compositeur" },
  ];

  const [musician, setMusician] = useState(undefined);
  const [open, setOpen] = React.useState(false);

  //if id is defined we fetch the musician with the id
  useEffect(() => {
    if (id !== undefined) {
      fetch(`http://localhost:3001/musician/${id}`)
        .then((response) => response.json())
        .then((data) => setMusician(data));
    }
  }, [id]);

  const [specialityValue, setSpecialityValue] = useState(
    specialityOptions[0].value
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id !== undefined) {
      const formData = new FormData(e.target);
      const musician = {
        nickname: formData.get("nickname"),
        image: formData.get("image"),
        //get speciality value from dropdown
        speciality: specialityValue,
      };

      fetch(`http://localhost:3001/musician/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(musician),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));

      setOpen(false);
    } else {
      const formData = new FormData(e.target);
      const musician = {
        nickname: formData.get("nickname"),
        image: formData.get("image"),
        //get speciality value from dropdown
        speciality: specialityValue,
      };

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

      setOpen(false);
    }
  };

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
              {id !== undefined
                ? "Modifier un musicien"
                : "Ajouter un musicien"}
            </Modal.Header>
            <Modal.Content>
              <Form.Input
                fluid
                name="nickname"
                label="Surnom"
                placeholder={musician ? musician.nickname : "Entrez un surnom"}
                required={true}
                id="form-input-first-name"
              />
              <Form.Input
                fluid
                name="image"
                label="Image"
                placeholder={musician ? musician.image : "Choisissez une image"}
                required={true}
              />
              <Form.Dropdown
                fluid
                selection
                name="speciality"
                label="Specialité"
                placeholder={
                  musician ? musician.speciality : "Choisissez une spécialité"
                }
                required={true}
                options={specialityOptions}
                onChange={(e, { value }) => setSpecialityValue(value)}
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
