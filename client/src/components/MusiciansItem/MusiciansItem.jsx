import React from "react";
import { Button, Item } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { Popup } from "semantic-ui-react";
import MusicianForm from "../MusicianForm/MusicianForm";
import { toast } from "react-toastify";

const MusiciansItem = () => {
  const admin = localStorage.getItem("admin");

  // Get all musicians with fetch useEffect
  const [musicians, setMusicians] = useState([]);

  // Delete musician on button click
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/musician/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) =>
        toast.success("Musicien supprimé avec succès", {
          position: "top-right",
          autoClose: 2000,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        })
      );
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
            trigger={<Item.Image size="small" src={musician.image} />}
          />
          <Item.Content>
            <Item.Header as="a">{musician.nickname}</Item.Header>

            <Item.Description>
              {
                // Upper first letter of speciality
                musician.speciality.charAt(0).toUpperCase() +
                  musician.speciality.slice(1)
              }
            </Item.Description>
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
