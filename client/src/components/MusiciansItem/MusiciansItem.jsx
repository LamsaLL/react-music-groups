import React from "react";
import { Button, Image, Item } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { Popup } from "semantic-ui-react";
import MusicianForm from "../MusicianForm/MusicianForm";

const MusiciansItem = () => {
  const admin = localStorage.getItem("admin");
  console.log("admin: " + admin);

  //get all musicians with fetch useEffect
  const [musicians, setMusicians] = useState([]);

  //delete musician on button click
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/musician/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    fetch("http://localhost:3001/musicians")
      .then((response) => response.json())
      .then((data) => setMusicians(data.filter((x) => x)));
  }, []);

  return (
    <Item.Group>
      {musicians.map((musician) => (
        <Item key={musician.id}>
          <Popup
            content={`Surnom: ${musician.nickname}`}
            on="click"
            pinned
            trigger={<Item.Image size="tiny" src={musician.image} />}
          />
          <Item.Content>
            <Item.Header as="a">{musician.nickname}</Item.Header>

            <Item.Description>{musician.speciality}</Item.Description>
            {admin ? (
              <Item.Extra>
                <Button
                  basic
                  floated="right"
                  color="red"
                  onClick={() => handleDelete(musician.id)}
                >
                  Supprimer
                </Button>

                <MusicianForm
                  id={musician.id}
                  buttonTrigger={
                    <Button basic floated="right" color="blue">
                      Modifier
                    </Button>
                  }
                ></MusicianForm>
              </Item.Extra>
            ) : null}
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};

export default MusiciansItem;
