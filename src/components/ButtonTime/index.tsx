import React from "react";

import "./styles.css";

interface IPropsDTO {
  onClick: any;
}

const ButtonTime = ({ onClick }: IPropsDTO) => {
  return (
    <>
      <button className="button" onClick={onClick} data-testid="button-time">
        Set Hours
      </button>
    </>
  );
};

export default ButtonTime;
