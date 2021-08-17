import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ButtonTime from "../../components/ButtonTime";
import Card from "../../components/Card";
import Clock from "../../components/Clock";

import "./styles.css";
import { useHistory } from "react-router-dom";
import moment from "moment";

const WorkedPointMarker = () => {
  const history = useHistory();

  const [totalHours, setTotalHours] = useState<number>(0);

  const handleHoursBank = useCallback(async () => {
    await axios
      .get("http://localhost:3001/hoursBank")
      .then((res: any) => setTotalHours(res.data[0].total));
  }, []);

  useEffect(() => {
    handleHoursBank();
  }, [handleHoursBank]);

  async function handleSetValues() {
    let senseMark = "";
    let totalHoursAux = totalHours;

    await axios.get("http://localhost:3001/points").then((res: any) => {
      const markings = res.data.filter(
        (point: any) => point.date === new Date().toDateString()
      );

      if (markings.length === 0) {
        senseMark = "A";
      }

      const firstSumHour = res.data.filter(
        (point: any) =>
          point.date === new Date().toDateString() && point.sense === "A"
      )[0];

      if ([1, 2].includes(markings.length)) {
        senseMark = "L";

        if (markings.length === 1) {
          totalHoursAux = moment
            .duration(new Date().toLocaleTimeString())
            .subtract(moment.duration(firstSumHour.time))
            .asHours();
        }
      }

      const secondSumHour = res.data.filter(
        (point: any) =>
          point.date === new Date().toDateString() && point.sense === "L"
      )[1];

      if (markings.length === 3) {
        senseMark = "E";

        totalHoursAux = moment
          .duration(new Date().toLocaleTimeString())
          .subtract(moment.duration(secondSumHour.time))
          .asHours();
      }

      const extraSumHour = res.data.filter(
        (point: any) =>
          point.date === new Date().toDateString() && point.sense === "Extra"
      );

      if (markings.length > 3) {
        senseMark = "Extra";

        if (markings.length > 4 && markings.length % 2 === 1) {
          totalHoursAux = moment
            .duration(new Date().toLocaleTimeString())
            .subtract(
              moment.duration(extraSumHour[extraSumHour.length - 1].time)
            )
            .asHours();
        }
      }
    });

    return { senseMark, totalHoursAux };
  }

  async function handleMarkPoint() {
    const { senseMark, totalHoursAux } = await handleSetValues();

    await axios.put("http://localhost:3001/hoursBank/1", {
      total: totalHours + totalHoursAux,
    });

    await axios
      .post("http://localhost:3001/points", {
        id: (Math.random() * 10000).toFixed(0),
        time: new Date().toLocaleTimeString(),
        date: new Date().toDateString(),
        sense: senseMark,
      })
      .then((res: any) => history.push("/"))
      .catch((error: any) => console.log(error));
  }

  return (
    <>
      <Card>
        <button className="close" onClick={() => history.push("/")}>
          X
        </button>

        <span className="title">Working Hours Marker</span>

        <Clock />

        <ButtonTime onClick={() => handleMarkPoint()} />
      </Card>
    </>
  );
};

export default WorkedPointMarker;
