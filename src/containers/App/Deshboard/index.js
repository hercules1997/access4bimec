/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import Chart from "react-google-charts";
import api from "../../../services/api";
import { Container, ContainerList } from "./style";
import jsPDF from "jspdf";
import html2canvas from "html2canvas"; //TODO TEM QUE INSTALAR A BIBLIOTECA PARA FUNCIONAR

export function Deshboard() {
  const [people, setPeople] = useState([]);
  const [visit, setVisit] = useState([]);
  const [status, setStatus] = useState([]);
  const componentRef1 = useRef();
  const componentRef2 = useRef();
  const componentRef3 = useRef();
  const componentRef4 = useRef();

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data: peopleData } = await api.get("visits");
        const { data: registroData } = await api.get("visits-registers");
        const { data: statusData } = await api.get("visits-status");

        setPeople(peopleData);
        setVisit(registroData);
        setStatus(statusData);

        // Aguarde a renderização completa dos gráficos

        // Continue com o restante do código...
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
    colors: ["#66A3FF", "red", "blue", "green"],
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

  const generatePDF = async () => {
    const pdf4 = new jsPDF({ orientation: "l" });
    const pdf1 = new jsPDF({ orientation: "l" });
    const pdf2 = new jsPDF({ orientation: "l" });
    const pdf3 = new jsPDF({ orientation: "l" });

    // Obter a referência do componente
    const content1 = componentRef1.current;
    const content2 = componentRef2.current;
    const content3 = componentRef3.current;
    const content4 = componentRef4.current;

    // Converter o conteúdo do componente para uma imagem
    const canvas1 = await html2canvas(content1);
    const canvas2 = await html2canvas(content2);
    const canvas3 = await html2canvas(content3);
    const canvas4 = await html2canvas(content4);

    const imgData1 = canvas1.toDataURL("image/png");
    const imgData2 = canvas2.toDataURL("image/png");
    const imgData3 = canvas3.toDataURL("image/png");
    const imgData4 = canvas4.toDataURL("image/png");

    const imgWidth1 = 300; // Largura da imagem no PDF
    const imgHeight1 = (canvas1.height * imgWidth1) / canvas1.width; // Calcular altura proporcional
    const x1 = (pdf1.internal.pageSize.getWidth() - imgWidth1) / 2; // Centralizar na largura do PDF
    const y1 = (pdf1.internal.pageSize.getHeight() - imgHeight1) / 2; // Centralizar na altura do PDF
    pdf1.addImage(imgData1, "JPEG", x1, y1, imgWidth1, imgHeight1);

    const imgWidth2 = 300; // Largura da imagem no PDF
    const imgHeight2 = (canvas2.height * imgWidth2) / canvas2.width; // Calcular altura proporcional
    const x2 = (pdf2.internal.pageSize.getWidth() - imgWidth2) / 2; // Centralizar na largura do PDF
    const y2 = (pdf2.internal.pageSize.getHeight() - imgHeight2) / 2; // Centralizar na altura do PDF
    pdf2.addImage(imgData2, "JPEG", x2, y2, imgWidth2, imgHeight2);

    const imgWidth3 = 300; // Largura da imagem no PDF
    const imgHeight3 = (canvas3.height * imgWidth3) / canvas3.width; // Calcular altura proporcional
    const x3 = (pdf3.internal.pageSize.getWidth() - imgWidth3) / 2; // Centralizar na largura do PDF
    const y3 = (pdf3.internal.pageSize.getHeight() - imgHeight3) / 2; // Centralizar na altura do PDF
    pdf3.addImage(imgData3, "JPEG", x3, y3, imgWidth3, imgHeight3);

    const imgWidth4 = 300; // Largura da imagem no PDF
    const imgHeight4 = (canvas4.height * imgWidth4) / canvas4.width; // Calcular altura proporcional
    const x4 = (pdf4.internal.pageSize.getWidth() - imgWidth4) / 2; // Centralizar na largura do PDF
    const y4 = (pdf4.internal.pageSize.getHeight() - imgHeight4) / 2; // Centralizar na altura do PDF
    pdf4.addImage(imgData4, "JPEG", x4, y4, imgWidth4, imgHeight4);

    // Adicionar a imagem ao PDF

    // Salvar o PDF
    pdf1.save("Locais.pdf");
    pdf2.save("Motivos.pdf");
    pdf3.save("frequência.pdf");
    pdf4.save("Totais.pdf");
  };

  return (
    <Container>
      <ContainerList>
        <div ref={componentRef1}>
          <Chart
            chartType="PieChart"
            data={getChartData1()}
            legendToggle="#fff"
            width="100%"
            options={options}
          />
        </div>
        <div ref={componentRef2}>
          <Chart
            chartType="BarChart"
            data={getChartData2()}
            width="100%"
            options={options2}
          />
        </div>
        <div ref={componentRef3}>
          <Chart
            title="Análise dos dias da semana"
            chartType="LineChart"
            data={getChartData3()}
            width="100%"
            options={options3}
          />
        </div>
        <div className="resultFinal" ref={componentRef4}>
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
        <button onClick={generatePDF}>Gerar PDF</button>
      </ContainerList>
    </Container>
  );
}
