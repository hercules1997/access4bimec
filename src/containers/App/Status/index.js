/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import formatDate from "../../../utils/formatDate";
import moment from "moment-timezone";
import "moment/locale/pt-br";
import emailjs from "emailjs-com";
import {
  ButtonFinaly,
  Container,
  ContainerList,
  DateStyle,
  Description,
  Image,
  List,
} from "./style";
import { useEffect } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { PopUp } from "../../../components";

export function Status() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [status, setStatus] = useState();
  const [visit, setVisit] = useState();
  // const navigate = useNavigate();

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data: status } = await api.get("visits-status");
        const { data: registro } = await api.get("visits-registers");

        setStatus(status);
        setVisit(registro);
      } catch (error) {
        console.log(error);
      }
    }

    loadOrders();
  }, []);

  const fusoHorarioBrasilia = "America/Sao_Paulo";
  const dataHoraAtualBrasilia = moment().tz(fusoHorarioBrasilia);
  const dataAmanha = dataHoraAtualBrasilia.clone().add(1, "days");

  const dateEntryData = dataAmanha.format("YYYY-MM-DD");
  const timeEntryTime = dataHoraAtualBrasilia.format("HH:mm");

  const openPopup = (idSts) => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleConfirm = async (idSts) => {
    closePopup(); 

    const matchingVisits = visit.filter(
      (visitItem) => visitItem.visitPeople.id === idSts.visitPeople.id
    );

    if (matchingVisits.length > 0) {
      const lastVisit = matchingVisits.pop(); 

      try {
        const updatedVisitRegisterBD = {
          departureDate: dateEntryData,
          departureTime: timeEntryTime,
          status: "Visita finalizada!",
        };

        await toast.promise(
          api.put(`visits-registers/${lastVisit._id}`, updatedVisitRegisterBD),
          {
            pending: "Registrando no banco de dados...",
            success: "Registrado no banco de dados com sucesso!",
            error: "Falha ao registrar, por favor tente novamente!",
          }
        );

        setTimeout(() => {
          toast.promise(api.delete(`visits-status/${idSts._id}`), {
            pending: "Deletando status no banco de dados...",
            success: "Visita finalizada!",
            error: "Falha finalizar visita, por favor tente novamente!",
          });

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }, 2000);

        const emailData = {
          service_id: "service_4BIMEC",
          template_id: "template_qri9kv7",
          user_id: "2rUdJ0t4bmYBx5BD7",
          template_params: {
            to_name: idSts.visitPeople.name,
            to_email: idSts.visitPeople.email,
            subject: "Obrigado pela sua visita!",
            message: `Ficamos felizes por sua visita.\n\nDetalhes da visita:\nNome: ${
              idSts.visitPeople.name
            }\nLocal: ${idSts.visitLocal}\nData: ${formatDate(
              idSts.dateEntry
            )}\nHorário: ${
              idSts.timeEntry
            } hrs\nStatus: Visita finalizada!\nMotivo: ${idSts.reason}\n   `,
          },
        };

        await emailjs.send(
          emailData.service_id,
          emailData.template_id,
          emailData.template_params,
          emailData.user_id
        );

        // Outras lógicas, como fechar o popup ou navegar para outra página
      } catch (error) {
        console.error("Erro ao atualizar visita registrada:", error);
      }
    } else {
      console.log("Visita correspondente não encontrada");
    }
  };
  const handleCancel = () => {
    closePopup();
  };

  return (
    <Container>
      {status && status?.length > 0 ? (
        status.map((mapVisit) => (
          <ContainerList key={mapVisit._id}>
            <List>
              <Image>
                <img src={mapVisit.visitPeople.path} />
              </Image>

              <Description>
                <p className="title">Nome do visitante</p>
                {mapVisit.visitPeople.name}
              </Description>
              <DateStyle>
                <p className="title">Local</p>
                <p>{mapVisit.visitLocal}</p>
              </DateStyle>
              <DateStyle>
                <p className="title">Data</p>
                <p>{formatDate(mapVisit.dateEntry)}</p>
              </DateStyle>
              <DateStyle>
                <p className="title">Horário</p>
                <p>{`${mapVisit.timeEntry} hrs`}</p>
              </DateStyle>
              <DateStyle>
                <p className="title">Status</p>
                <p className="status">{mapVisit.status}</p>
              </DateStyle>
              <DateStyle>
                <p className="title">Motivo</p>
                <p>{mapVisit.reason}</p>
              </DateStyle>
              <ButtonFinaly>
                <button onClick={() => openPopup(mapVisit)}>Finalizar</button>
              </ButtonFinaly>

              <PopUp
                isOpen={isPopupOpen}
                onClose={closePopup}
                onConfirm={() => handleConfirm(mapVisit)}
                onCancel={handleCancel}
              />
            </List>
          </ContainerList>
        ))
      ) : (
        <div className="vazio">Nenhuma visita em andamento</div>
      )}
    </Container>
  );
}
