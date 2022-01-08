import React from "react";
import { Button, Image, Item } from "semantic-ui-react";
import { useEffect, useState, useCallback } from "react";
import { Popup } from "semantic-ui-react";
import GroupForm from "../GroupForm/GroupForm.jsx";

const GroupsItem = () => {
  const admin = localStorage.getItem("admin");

  //delete groups on button click
  const handleDelete = useCallback((id) => {
    fetch(`http://localhost:3001/group/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  //get all groups with fetch useEffect
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/groups")
      .then((response) => response.json())
      .then((data) => setGroups(data.filter((x) => x)));
  }, []);

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

            <Item.Description>{group.description}</Item.Description>
            {admin ? (
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
            ) : null}
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};

export default GroupsItem;
