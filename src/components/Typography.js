import React from "react";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
const Typography = () => {
  return (
    <Stack spacing={2} direction='row' justifyContent="center">
      <Button variant="contained">Hello World1</Button>
      <Button variant="contained">Hello World2</Button>
      <Button variant="contained">Hello World3</Button>
    </Stack>
  );
};

export default Typography;
