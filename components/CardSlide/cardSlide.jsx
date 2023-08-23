import React, { useState } from "react";

const CardSlide = () => {
  const [isSliding, setIsSliding] = useState(false);
  const handleSlide = () => {
    setIsSliding(!isSliding);
  };

  return <div>cardSlide</div>;
};

export default CardSlide;
