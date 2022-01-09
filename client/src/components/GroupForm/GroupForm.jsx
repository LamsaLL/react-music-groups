import React, { useState, useEffect } from "react";
import { Container, Form, Modal, Button } from "semantic-ui-react";
import { toast } from "react-toastify";

const GroupForm = ({ buttonTrigger, id }) => {
  const [group, setGroup] = useState(undefined);
  const [musicians, setMusicians] = useState([]);
  const [selectedMusicians, setSelectedMusicians] = useState([]);

  const [open, setOpen] = React.useState(false);

  const imageOptions = [
    {
      value: "mark",
      text: "Mark",
      image: {
        avatar: true,
        src: "https://semantic-ui.com/images/avatar2/small/mark.png",
      },
    },
    {
      value: "patrick",
      text: "Patrick",
      image: {
        avatar: true,
        src: "https://semantic-ui.com/images/avatar2/small/patrick.png",
      },
    },
    {
      value: "nan",
      text: "Nan",
      image: {
        avatar: true,
        src: "https://semantic-ui.com/images/avatar/small/nan.jpg",
      },
    },
  ];
  const [imageValue, setImageValue] = useState(imageOptions[0].image.src);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Find image in imageOptions with imageValue and return image.src
    const image = imageOptions.find((image) => image.value === imageValue);
    const imageSrc = image.image.src;
    const formData = new FormData(e.target);
    const group = {
      name: formData.get("name"),
      image: imageSrc,
      description: formData.get("description"),
      musiciansId: selectedMusicians,
    };
    // If we have an id, we update the group else we create a new one
    if (id !== undefined) {
      fetch(`http://localhost:3001/group/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(group),
      })
        .then((response) => response.json())
        .then((data) =>
          toast.success("Groupe modifié avec succès", {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          })
        );
    } else {
      fetch("http://localhost:3001/group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(group),
      })
        .then((response) => response.json())
        .then((data) =>
          toast.success("Groupe ajouté avec succès", {
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

  return (
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
              placeholder={"Entrez un nom de groupe"}
              required={true}
              defaultValue={group ? group.name : ""}
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
            <Form.Input
              fluid
              name="description"
              label="Description"
              placeholder={"Choisissez une description"}
              required={true}
              defaultValue={group ? group.description : ""}
            />
            <Form.Dropdown
              fluid
              selection
              name="musicians"
              label="Musiciens"
              multiple
              placeholder={"Choisissez un ou plusieurs musiciens"}
              required={true}
              options={musicians.map((musician) => ({
                key: musician.id,
                text: musician.nickname,
                value: musician.id,
              }))}
              onChange={(e, { value }) => {
                setSelectedMusicians(value);
              }}
              defaultValue={group ? group.musiciansId : []}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button type="submit" content="Sauvegarder" />
          </Modal.Actions>
        </Modal>
      </Form>
    </Container>
  );
};

export default GroupForm;
