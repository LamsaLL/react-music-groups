import React, { useState, useEffect } from "react";
import { Container, Form, Modal, Button } from "semantic-ui-react";
import { toast } from "react-toastify";

const MusicianForm = ({ buttonTrigger, id }) => {
  const specialityOptions = [
    { key: "guitarrist", text: "Guitariste", value: "guitariste" },
    { key: "bassist", text: "Bassiste", value: "bassiste" },
    { key: "singer", text: "Chanteur", value: "chanteur" },
    { key: "vocalist", text: "Vocaliste", value: "vocaliste" },
    { key: "composer", text: "Compositeur", value: "compositeur" },
  ];

  const imageOptions = [
    {
      value: "elliot",
      text: "Ellliot",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
      },
    },
    {
      value: "stevie",
      text: "Stevie",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/small/stevie.jpg",
      },
    },
    {
      value: "christian",
      text: "Christian",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/small/christian.jpg",
      },
    },
  ];

  const [musician, setMusician] = useState(undefined);
  const [open, setOpen] = React.useState(false);

  // If id is defined we fetch the musician with the id
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

  const [imageValue, setImageValue] = useState(imageOptions[0].image.src);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Find image in imageOptions with imageValue and return image.src
    const image = imageOptions.find((image) => image.value === imageValue);
    const imageSrc = image.image.src;
    const formData = new FormData(e.target);

    const musician = {
      nickname: formData.get("nickname"),
      image: imageSrc,
      // Get speciality value from dropdown
      speciality: specialityValue,
    };

    if (id !== undefined) {
      fetch(`http://localhost:3001/musician/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(musician),
      })
        .then((response) => response.json())
        .then((data) =>
          toast.success("Musicien modifié avec succès", {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          })
        );
    } else {
      fetch("http://localhost:3001/musician", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(musician),
      })
        .then((response) => response.json())
        .then((data) =>
          toast.success("Musicien ajouté avec succès", {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          })
        );
    }
    setOpen(false);
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
                placeholder={"Entrez un surnom"}
                required={true}
                defaultValue={musician ? musician.nickname : ""}
                id="form-input-first-name"
              />
              <Form.Dropdown
                fluid
                selection
                name="image"
                label="Image"
                placeholder={"Choisissez une image"}
                required={true}
                options={imageOptions}
                onChange={(e, { value }) => {
                  setImageValue(value);
                }}
              />
              <Form.Dropdown
                fluid
                selection
                name="speciality"
                label="Specialité"
                placeholder={"Choisissez une spécialité"}
                required={true}
                options={specialityOptions}
                defaultValue={musician ? musician.speciality : ""}
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
