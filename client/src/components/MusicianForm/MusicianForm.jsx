import React from "react";
import { Container, Form, Segment, Select, Label } from "semantic-ui-react";

const MusicianForm = () => {
  const specialityOptions = [
    { key: "guitarrist", text: "Guitariste", value: "guitarrist" },
    { key: "bassist", text: "Bassiste", value: "bassist" },
    { key: "drummer", text: "Tambouriniste", value: "drummer" },
    { key: "singer", text: "Chanteur", value: "singer" },
    { key: "keyboardist", text: "Clavieriste", value: "keyboardist" },
    { key: "vocalist", text: "Vocaliste", value: "vocalist" },
    { key: "composer", text: "Compositeur", value: "composer" },
    { key: "producer", text: "Producteur", value: "producer" },
  ];

  return (
    <>
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
      <Form.Select
        fluid
        name="speciality"
        label="Specialité"
        placeholder="Choisissez une spécialité"
        required={true}
        options={specialityOptions}
      />
    </>
  );
};

export default MusicianForm;
