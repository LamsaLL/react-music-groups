import React from "react";
import { Button, Image, Item } from "semantic-ui-react";
import { useEffect, useState } from "react";
const MusiciansItem = () => {
  //get all musicians with fetch useEffect
  const [musicians, setMusicians] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/musicians")
      .then((response) => response.json())
      .then((data) => setMusicians(data));
  }, []);

  return (
    <Item.Group>
      {musicians.map((musician) => (
        <Item key={musician.id}>
          <Item.Image size="small" src={musician.image} />
          <Item.Content>
            <Item.Header as="a">{musician.nickname}</Item.Header>
            <Item.Description>{musician.speciality}</Item.Description>
            <Item.Extra>
              <Button basic floated="right" color="blue">
                Ajouter
              </Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};

export default MusiciansItem;
