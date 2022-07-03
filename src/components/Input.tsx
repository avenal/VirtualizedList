import React from "react";
import TextField from "@mui/material/TextField";
interface Props {
  value: HTMLInputElement["value"];
  name: string;
  handleChange: (
    value: React.ChangeEvent<HTMLInputElement>["currentTarget"]["value"]
  ) => void;
}

export const Input = ({ value, name, handleChange }: Props) => {
  return (
    <TextField
      fullWidth
      name="filter"
      value={value}
      placeholder="Filter by name"
      onChange={(e) => handleChange(e.currentTarget.value)}
      margin={'dense'}
    />
  );
};
