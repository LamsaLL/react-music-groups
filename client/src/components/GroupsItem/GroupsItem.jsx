import React from "react";
import { Button, Image, Item } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { Popup } from "semantic-ui-react";
import GroupForm from "../GroupForm/GroupForm.jsx";

const GroupsItem = () => {
  //get all groups with fetch useEffect
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/groups")
      .then((response) => response.json())
      .then((data) => setGroups(data.filter((x) => x)));
  }, []);

  //delete groups on button click
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/groups/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <Item.Group>
      {groups.map((group) => (
        <Item key={group.id}>
          <Popup
            content={`Nom du groupe: ${group.name}`}
            on="click"
            pinned
            trigger={<Item.Image size="small" src={group.image} />}
          />
          <Item.Content>
            <Item.Header as="a">{group.name}</Item.Header>

            <Item.Description>{group.Description}</Item.Description>
            <Item.Extra>
              <Button
                basic
                floated="right"
                color="red"
                onClick={() => handleDelete(group.id)}
              >
                Supprimer
              </Button>

              <GroupForm
                id={group.id}
                buttonTrigger={
                  <Button basic floated="right" color="blue">
                    Modifier
                  </Button>
                }
              ></GroupForm>
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};

export default GroupsItem;
