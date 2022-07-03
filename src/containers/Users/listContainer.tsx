import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { Input, UsersList } from "../../components";
import { fetchUsers } from "./api";
import { User } from "./types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const ListContainer = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [checked, setChecked] = useState<User["id"][]>([]);

  const sortByLastName = (data: User[]): User[] => {
    return data.sort((a, b) => a.last_name.localeCompare(b.last_name));
  };

  const handleClick = (id: User["id"]) => {
    if (checked.includes(id)) {
      setChecked((prev) => {
        return prev.filter((element) => element !== id);
      });
    } else {
      setChecked((prev) => {
        return [...prev, id];
      });
    }
  };

  const usersQuery = useQuery("users", fetchUsers, {
    select: sortByLastName,
  });

  useEffect(() => {
    console.log(checked);
  }, [checked]);

  const filteredData = useMemo(() => {
    const data = usersQuery.data ?? [];
    const filterValue = inputValue.trim().toLowerCase();

    if (filterValue.trim().length > 0) {
      return data.filter((item) =>
        `${item.first_name} ${item.last_name}`
          .toLowerCase()
          .includes(filterValue)
      );
    } else {
      return data;
    }
  }, [inputValue, usersQuery.data]);

  if (usersQuery.isLoading) return <p>"Loading..."</p>;

  if (usersQuery.error) return <p>"An error has occurred: "</p>;

  return (
    <Box>
      <Typography variant="h4" component={"h2"}>
        List of users
      </Typography>
      <Box sx={{ py: 2 }}>
        <Input
          name={"filter_input"}
          value={inputValue}
          handleChange={(value) => setInputValue(value)}
        />
      </Box>
      {usersQuery.isSuccess ? (
        <UsersList
          data={filteredData}
          handleClick={handleClick}
          checked={checked}
        />
      ) : null}
    </Box>
  );
};
