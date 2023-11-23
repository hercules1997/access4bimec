import React, { useEffect, useState } from "react";

import { CardHistoryStyle } from "./style";
import api from "../../services/api";
import formatDate from "../../utils/formatDate";

export function CardHistory() {
  const [visitor, setVisitor] = useState();
  const [dateSearchTerm, setDateSearchTerm] = useState("");
  const [people, setPeople] = useState();

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data } = await api.get("visits");
        const sortedPeople = data.sort((a, b) => a.name.localeCompare(b.name));
        
        const { data: visits } = await api.get("visits-registers");
        setVisitor(visits);
        setDateSearchTerm(sortedPeople);
        setPeople(sortedPeople);
      } catch (error) {
        console.log(error);
      }
    }

    loadOrders();
  }, []);

  function handleDateSearch(e) {
    const dateSearchTerm = e.target.value;
    setDateSearchTerm(dateSearchTerm);
  }

  return (
    <CardHistoryStyle>
      <input
        type="text"
        placeholder="Busque pela data"
        onChange={handleDateSearch}
      />
      <span>Histórico de visitas</span>
      <div>
        <div className="headerHistory">
          <p>Entrada</p>
          <p>Saída</p>
        </div>
        <div className="rolHistory">
          {visitor &&
            visitor.map((reg) =>
              people.id === reg.visitPeople.id &&
              (dateSearchTerm
                ? formatDate(reg.dateEntry).includes(dateSearchTerm) ||
                  formatDate(reg.departureDate).includes(dateSearchTerm)
                : true) ? (
                <ul key={reg._id}>
                  <li>
                    <span>
                      <p>{formatDate(reg.dateEntry)}</p>
                      <p>{reg.timeEntry} hrs</p>
                    </span>
                    <span className="traco"></span>
                    <span>
                      <p>{formatDate(reg.departureDate)}</p>
                      <p>{reg.departureTime} hrs</p>
                    </span>
                  </li>
                </ul>
              ) : (
                <React.Fragment key={reg._id}></React.Fragment>
              )
            )}
        </div>
      </div>
    </CardHistoryStyle>
  );
}
