import React, { memo } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { User } from "../containers/Users";
import { FixedSizeList as List } from "react-window";
import { ListChildComponentProps, areEqual } from "react-window";

interface Props {
  data: User[];
  handleClick: (id: User["id"]) => void;
  checked: User["id"][];
}

export const UsersList = ({ data, handleClick, checked }: Props) => {
  const Item = memo(
    ({ index, style, data }: ListChildComponentProps<User[]>) => {
      const labelId = `checkbox-list-label-${data[index].id}`;
      const user = data[index];
      return (
        <ListItem
          style={style}
          key={user.id}
          component="div"
          disablePadding
          secondaryAction={
            <Checkbox
              edge="end"
              onChange={() => handleClick(user.id)}
              checked={checked.includes(user.id)}
              inputProps={{ "aria-labelledby": labelId }}
            />
          }
        >
          <ListItemButton onClick={() => handleClick(user.id)}>
            <ListItemAvatar>
              {user.avatar ? (
                <Avatar
                  alt={`${user.first_name} ${user.last_name}'s avatar`}
                  src={user.avatar}
                />
              ) : null}
            </ListItemAvatar>
            <ListItemText
              id={labelId}
              primary={`${user.first_name} ${user.last_name}`}
              secondary={user.email}
            />
          </ListItemButton>
        </ListItem>
      );
    },
    areEqual
  );

  return (
    <List
      width={"100%"}
      height={500}
      itemCount={data.length}
      itemSize={64}
      itemData={data}
    >
      {Item}
    </List>
  );
};
