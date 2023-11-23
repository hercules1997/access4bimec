/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import api from "../../../services/api";
import { Container, ContainerList } from "./style";

export function Deshboard() {
  const [people, setPeople] = useState([]);
  const [visit, setVisit] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data: peopleData } = await api.get("visits");
        const { data: registroData } = await api.get("visits-registers");
        const { data: statusData } = await api.get("visits-status");

        setPeople(peopleData);
        setVisit(registroData);
        setStatus(statusData);
      } catch (error) {
        console.log(error);
      }
    }

    loadOrders();
  }, []);

  const getChartData1 = () => {
    const groupedByLocal = visit.reduce((acc, person) => {
      acc[person.visitLocal] = (acc[person.visitLocal] || 0) + 1;
      return acc;
    }, []);

    const data1 = [["Locais", "Visitas"]];
    Object.entries(groupedByLocal).forEach(([local, visits]) => {
      data1.push([local, visits]);
    });

    return data1;
  };

  const getChartData2 = () => {
    const groupedByLocal = visit.reduce((acc, visitItem) => {
      acc[visitItem.reason] = (acc[visitItem.reason] || 0) + 1;
      return acc;
    }, []);

    const data2 = [["Motivos", "Visitas"]];
    Object.entries(groupedByLocal).forEach(([local, visits]) => {
      data2.push([local, visits]);
    });

    return data2;
  };

  const getChartData3 = () => {
    const groupedByDay = visit.reduce((acc, visitItem) => {
      acc[visitItem.dayOfTheWeek] = (acc[visitItem.dayOfTheWeek] || 0) + 1;
      return acc;
    }, []);

    const data3 = [["Dias da semana", "Visitas"]];
    Object.entries(groupedByDay).forEach(([day, visits]) => {
      data3.push([day, visits]);
    });

    return data3;
  };

  const options = {
    title: "Locais mais frequentes",
    is3D: true,
    backgroundColor: "#353535",
    colors: ["orange", "#66A3FF", "red", "blue", "green"],
    titleTextStyle: {
      color: "#fff",
      fontSize: 18,
      bold: true,
    },
    legend: {
      textStyle: {
        color: "#fff",
      },
    },
    hAxis: {
      textStyle: {
        color: "#fff",
      },
    },
    vAxis: {
      textStyle: {
        color: "#fff",
      },
    },
  };
  const options2 = {
    title: "Motivos mais frequentes",
    is3D: true,
    backgroundColor: "#353535",
    colors: [ "#66A3FF" , "red", "blue", "green"],
    titleTextStyle: {
      color: "#fff",
      fontSize: 18,
      bold: true,
    },
    legend: {
      textStyle: {
        color: "#fff",
      },
    },
    hAxis: {
      textStyle: {
        color: "#fff",
      },
    },
    vAxis: {
      textStyle: {
        color: "#fff",
      },
    },
  };
  const options3 = {
    title: "Frequencia dos dias da semana",
    is3D: true,
    backgroundColor: "#353535",
    colors: ["orange", "#66A3FF", "red", "blue", "green"],
    titleTextStyle: {
      color: "#fff",
      fontSize: 18,
      bold: true,
    },
    legend: {
      textStyle: {
        color: "#fff",
      },
    },
    hAxis: {
      textStyle: {
        color: "#fff",
      },
    },
    vAxis: {
      textStyle: {
        color: "#fff",
      },
    },
  };

  return (
    <Container>
      <ContainerList>
        <div>
          <Chart
            chartType="PieChart"
            data={getChartData1()}
            legendToggle="#fff"
            width="100%"
            options={options}
          />
        </div>
        <div>
          <Chart
            chartType="BarChart"
            data={getChartData2()}
            width="100%"
            options={options2}
          />
        </div>
        <di>

          <Chart
            title="Análise dos dias da semana"
            chartType="LineChart"
            data={getChartData3()}
            width="100%"
            options={options3}
          />
        </di>
        <div className="resultFinal">
          <span className="totales">
            <p>Total Geral de visitas</p>
            <p>{visit.length}</p>
          </span>
          <span>
            <p>Visitas em andamento</p>
            <p>{status.length}</p>
          </span>
          <span>
            <p>Total de pessoas registradas</p>
            <p>{people.length}</p>
          </span>
        </div>
      </ContainerList>
    </Container>
  );
}
