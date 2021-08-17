import React from "react";

import "./styles.css";

interface IPropsDTO {
  children: any;
}

const Card = ({ children }: IPropsDTO) => {
  return (
    <>
      <div className="card" data-testid="card">
        {children}
      </div>
    </>
  );
};

export default Card;
