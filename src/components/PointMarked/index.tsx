import React from "react";

import "./styles.css";

interface IPropsDTO {
  sense?: string;
  hour: string;
  date: string;
}

const PointMarked = ({ sense = "A", hour, date }: IPropsDTO) => {
  function setBackgroundColor() {
    const color = {
      A() {
        return "#00d500";
      },

      L() {
        return "#fffb00";
      },

      E() {
        return "#d50000";
      },

      Extra() {
        return "#9502eb";
      },
    };

    // @ts-ignore: Unreachable code erro
    return color[sense]();
  }

  return (
    <>
      <li>
        <div
          className="circle"
          style={{ backgroundColor: setBackgroundColor() }}
          data-testid="circle"
        />

        <div>
          <div className="time" data-testid="hour">
            {hour}
          </div>
          <div className="date" data-testid="date">
            {date}
          </div>
        </div>
      </li>
    </>
  );
};

export default PointMarked;
