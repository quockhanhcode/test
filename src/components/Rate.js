import React from "react";
import Rating from "@mui/material/Rating";
const Rate = () => {
  return (
    <div>
      <h1>Rating</h1>
     <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
    </div>
  );
};

export default Rate;
