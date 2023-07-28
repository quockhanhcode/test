import React from "react";
import { TextField } from "@mui/material";

const Field = () => {
  const mystyle = {
    color: "white",
    margin: "0 0 0 40px",
  };
  return (
    <div>
      <h1>Text Field</h1>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField
        style={mystyle}
        error
        id="outlined-error-helper-text"
        label="Error"
        defaultValue="Hello World"
        helperText="Incorrect entry."
      />
    </div>
  );
};

export default Field;
