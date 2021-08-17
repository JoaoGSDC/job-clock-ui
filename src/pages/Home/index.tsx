import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Card from "../../components/Card";
import PointMarked from "../../components/PointMarked";
import api from "../../services/api";

import "./styles.css";

const Home = () => {
  const history = useHistory();

  const [markedPoints, setMarkedPoints] = useState<any[]>([]);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [totalHoursPosted, setTotalHoursPosted] = useState<string>("");
  const [hoursBank, setHoursBank] = useState<string>("");

  const handleGetMarkedPoints = useCallback(async () => {
    await api.get("/points").then((res: any) => {
      setMarkedPoints(res.data);
    });

    await api
      .get("http://localhost:3001/hoursBank")
      .then((res: any) => setTotalHours(res.data[0].total));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    handleGetMarkedPoints();

    handleTotalHoursPosted();
    handleHoursBank();

    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleTotalHoursPosted() {
    const hours = Math.trunc(totalHours);
    const minutes = Math.trunc((totalHours - hours) * 60);
    const seconds = Math.trunc(((totalHours - hours) * 60 - minutes) * 60);

    const hoursText = `0${hours}`.slice(-2);
    const minutesText = `0${minutes}`.slice(-2);
    const secondsText = `0${seconds}`.slice(-2);

    setTotalHoursPosted(`${hoursText}:${minutesText}:${secondsText}`);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleHoursBank() {
    let dateAux: any[] = [];

    markedPoints.forEach((point: any) => {
      if (!dateAux.includes(point.date)) {
        dateAux.push(point.date);
      }
    });

    const supposedWorkTime: number = dateAux.length * 8;
    const hourCredit = totalHours - supposedWorkTime;

    const hours = Math.trunc(hourCredit);
    const minutes = Math.trunc((hourCredit - hours) * 60);
    const seconds = Math.trunc(((hourCredit - hours) * 60 - minutes) * 60);

    const hoursText = `0${hours}`.slice(-2);
    const minutesText = `0${minutes}`.slice(-2);
    const secondsText = `0${seconds}`.slice(-2);

    setHoursBank(`${hoursText}:${minutesText}:${secondsText}`);
  }

  return (
    <>
      <Card>
        <div className="worked-container">
          <div className="description-container">
            <label>Total hours posted</label>
            <label>{totalHoursPosted}</label>
          </div>

          <div className="description-container">
            <label>Hours Bank</label>
            <label>{hoursBank}</label>
          </div>
        </div>

        <div className="list">
          {markedPoints.map((point: any) => (
            <PointMarked
              key={point.id}
              hour={point.time}
              date={point.date}
              sense={point.sense}
            />
          ))}
        </div>

        <button onClick={() => history.push("/marker")}>
          Schedule Worked Hours
        </button>
      </Card>
    </>
  );
};

export default Home;
