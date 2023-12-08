import React, { useState } from "react";
import {
  ContainerItens,
  CardRegister,
  ButtonStyle,
  DatePickerStyle,
} from "./style.js";
import formatDate from "../../../utils/formatDate";
import api from "../../../services/api.js";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const GenerateReport = () => {
  const [allVisit, setAllVisit] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const visitsPerPage = 50;

  const loadOrders = async () => {
    try {
      let url = "visits-registers";

      // Adiciona parâmetros de data se elas estiverem definidas
      if (startDate && endDate) {
        url += `?startDate=${encodeURIComponent(
          formatDate(startDate.toISOString())
        )}&endDate=${encodeURIComponent(formatDate(endDate.toISOString()))}`;
      }

      const { data } = await api.get(url);

      // Realiza a filtragem dos dados com base nas datas
      const filteredData = data.filter((visit) => {
        const visitDate = new Date(visit.dateEntry);
        return (
          (!startDate || visitDate >= startDate) &&
          (!endDate || visitDate <= endDate)
        );
      });

      setAllVisit(filteredData);
    } catch (error) {
      console.error(error);
    }
  };
  const generatePDF = () => {
    const pdf = new jsPDF("landscape");
    // // Adiciona as datas no cabeçalho do PDF
    // pdf.text(
    //   `Serviço do dia ${formatDate(startDate)} para o dia ${formatDate(
    //     endDate
    //   )}`,
    //   10,
    //   20
    // );
    // Cabeçalho
    const header = function (data) {
       pdf.text("CONTROLE DE ENTRADA E SAÍDA DE VISITANTES NO 4° BI Mec\n\n", 10, 10);

      pdf.text(
        `\nServiço do dia ${formatDate(startDate)} para o dia ${formatDate(
          endDate
        )}`,
        data.settings.margin.left,
        14
      );
    };

    // Rodapé
    const footer = function (data) {
      const pageCount = pdf.internal.getNumberOfPages();
      pdf.text(
        `Cmt Gda Sul ________________________     Of de dia   _____________________   SCmt ____________  \n Página${data.pageNumber} de ${pageCount}`,
        data.settings.margin.left,
        pdf.internal.pageSize.height - 10
      );
    };

    const columns = [
      "Nome completo",
      "Identidade",
      "Destino",
      "MOD",
      "COR",
      "PLACA",
      "ENT",
      "SAIDA",
      "ENT",
      "SAIDA",
      "Nr Crachá",
    ];

    const start = (currentPage - 1) * visitsPerPage;
    const end = currentPage * visitsPerPage;
    const rows = allVisit
      .slice(start, end)
      .map((visitsRegisters) => [
        visitsRegisters.visitPeople.name,
        visitsRegisters.visitPeople.rg,
        visitsRegisters.visitLocal,
        visitsRegisters.model,
        visitsRegisters.brand,
        visitsRegisters.plate,
        formatDate(visitsRegisters.dateEntry),
        formatDate(visitsRegisters.departureDate),
        visitsRegisters.timeEntry,
        visitsRegisters.departureTime,
        visitsRegisters.badge,
      ]);

    pdf.autoTable({
      head: [columns],
      body: rows,
      didDrawPage: function (data) {
        // Adiciona o cabeçalho e rodapé em todas as páginas
        header(data);
        footer(data);
      },
      startY: 30,
      styles: {
        overflow: "linebreak",
        halign: "center",
        fontSize: 10, // Tamanho da fonte
        fillColor: [255, 255, 255], // Cor de fundo
        textColor: [0, 0, 0], // Cor do texto
        lineWidth: 0.2, // Largura da linha },
        fontStyle: "Time New Roman",
        lineBorder: "deshed",
      },
    });

    pdf.save(`Relatório_${currentPage}.pdf`);
  };

  const totalPages = Math.ceil(allVisit.length / visitsPerPage);

  return (
    <ContainerItens>
      <CardRegister>
        <span className="header-report">
          <p>CONTROLE DE ENTRADA E SAÍDA DE VISITANTES NO 4° BI Mec </p>
          <p>
            Serviço do dia <span>{formatDate(startDate)}</span> para o dia
            <span> {formatDate(endDate)}</span>
          </p>
        </span>
        <div className="container-filter">
  



          <label>Selecione o período:</label>
          <DatePickerStyle
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd/MM/yyyy" // Configura o formato da data
            placeholderText="Data inicial"
            required
          />
          <DatePickerStyle
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="dd/MM/yyyy" // Configura o formato da data
            placeholderText="Data final"
            required
          />
          <ButtonStyle type="submit" onClick={loadOrders}>Buscar</ButtonStyle>
       
        </div>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th rowSpan={2}>Nome completo</th>
              <th rowSpan={2}>Identidade</th>
              <th rowSpan={2}>Destino</th>
              <th colSpan={3}>Veículo</th>
              <th colSpan={2}>Data</th>
              <th colSpan={2}>Horário</th>
              <th rowSpan={2}>Nr Crachá</th>
            </tr>
            <tr>
              <th>MOD</th>
              <th>COR</th>
              <th>PLACA</th>
              <th>ENT</th>
              <th>SAIDA</th>
              <th>ENT</th>
              <th>SAIDA</th>
            </tr>
          </thead>
          {/* Corpo da tabela */}
          <tbody>
            {allVisit
              .slice(
                (currentPage - 1) * visitsPerPage,
                currentPage * visitsPerPage
              )
              .map((visitsRegisters) => (
                <tr key={visitsRegisters._id}>
                  <td>{visitsRegisters.visitPeople.name}</td>
                  <td>{visitsRegisters.visitPeople.rg}</td>
                  <td>{visitsRegisters.visitLocal}</td>
                  <td className="vehicle">{visitsRegisters.model}</td>
                  <td className="vehicle">{visitsRegisters.brand}</td>
                  <td className="vehicle">{visitsRegisters.plate}</td>
                  <td>{formatDate(visitsRegisters.dateEntry)}</td>
                  <td>{formatDate(visitsRegisters.departureDate)}</td>
                  <td>{visitsRegisters.timeEntry}</td>
                  <td>{visitsRegisters.departureTime}</td>
                  <td>{visitsRegisters.badge}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <ButtonStyle onClick={generatePDF}>Gerar PDF</ButtonStyle>
        {totalPages > 1 && (
          <div>
            <span>Página: {currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próxima
            </button>
          </div>
        )}
      </CardRegister>
    </ContainerItens>
  );
};
