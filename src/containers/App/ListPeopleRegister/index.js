/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import KeyboardDoubleArrowDownSharpIcon from "@mui/icons-material/KeyboardDoubleArrowDownSharp";
import EditIcon from "@mui/icons-material/Edit";
import TourIcon from "@mui/icons-material/Tour";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import formatDate from "../../../utils/formatDate";
import Tooltip from '@mui/material/Tooltip'

import {
  ButtonFinaly,
  CardContainer,
  CardHistory,
  CardListPeople,
  Container,
  ContainerList,
  Date,
  Description,
  Image,
  InforList,
  LabelList,
  List,
  InputStyle,
  ContainerSearch,
  FormSearch,
  ButtonRegisterVisit,

} from "./style";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import paths from "../../../constants";
import { toast } from "react-toastify";
import ReactInputMask from "react-input-mask";
import { useUser } from "../../../hooks/UserContext";

export function ListPeopleRegister() {
  const [rotationAngles, setRotationAngles] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [openStates, setOpenStates] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [people, setPeople] = useState();
  const [dateSearchTerm, setDateSearchTerm] = useState("");
  const [visitor, setVisitor] = useState();
  const [statusVisit, setStatusVisit] = useState();

  const { userData } = useUser();
  const location = useNavigate();

  const toggleMenu = (id) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));

    setRotationAngles((prevState) => ({
      ...prevState,
      [id]: prevState[id] === 180 ? 0 : 180,
    }));
  };

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data } = await api.get("visits");
        const sortedPeople = data.sort((a, b) => a.name.localeCompare(b.name));
        const { data: status } = await api.get("visits-status");
        const { data: visits } = await api.get("visits-registers");
        setVisitor(visits);
        setStatusVisit(status);
        setPeople(sortedPeople);
        setSearchResults(sortedPeople);
      } catch (error) {
        console.log(error);
      }
    }

    loadOrders();
  }, []);



  function handleSearch(e) {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredResults = people.filter(
      (person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.cpf.includes(searchTerm)
    );

    setSearchResults(filteredResults);
  }

  function handleDateSearch(e) {
    const dateSearchTerm = e.target.value;
    setDateSearchTerm(dateSearchTerm);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const content = document.body.innerText;
    const index = content.indexOf(searchTerm);

    if (index !== -1) {
      window.scrollTo(+100, index);
    }
  }

  function RegisterVisit(peopleVisit) {
    const matchingStatus = statusVisit.find(
      (visitItem) => visitItem.visitPeople.id === peopleVisit.id
    );

    if (matchingStatus) {
      toast.error(
        "Não é possível registrar nova visita. A pessoa já possui uma visita em andamento."
      );
    } else {
      location(paths.RegisterOpen, { state: { peopleVisit } });
    }
  }

  function EdititRegister(peopleVisit) {
    const matchingStatus = statusVisit.find(
      (visitItem) => visitItem.visitPeople.id === peopleVisit.id
    );

    if (matchingStatus) {
      toast.error("Não é possível Editar pessoa, há uma visita em andamento.");
    } else {
      location(paths.EditRegister, { state: { peopleVisit } });
    }
  }

  async function DeleteRegister(id) {
    const matchingStatus = statusVisit.find(
      (visitItem) => visitItem.visitPeople.id === id.id
    );
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Tem certeza que deseja exluir pessoa?') === true) {

      if (matchingStatus) {
        toast.error("Não é possível deletar pessoa, há visita em andamento.");
      } else {
        await toast.promise(api.delete(`visits/${id}`), {
          success: "Pessoa deletada com sucesso!",
          error: "Falha ao Deletar pessoa",
          pending: "Deletando pessoa no banco de dados",
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    }

  }



  return (
    <>
      <Container>
        <ContainerSearch>
          <FormSearch onSubmit={handleSubmit}>
            <div className="search">
              <LabelList style={{ paddingRight: "15px" }}>Pesquisar</LabelList>
              <InputStyle
                placeholder="Nome, RG ou CPF"
                type="search"
                onChange={handleSearch}
              />
            </div>
          </FormSearch>
        </ContainerSearch>
        {searchResults &&
          searchResults.map((people) => (
            <ContainerList key={people.id}>
              <List>

                <Image onClick={() => openImageDialog(people.url)}>
                  <img src={people.url} alt={people.name} />

                <Image>
                  <img src={people.url} />

                </Image>
                <Description>
                  <LabelList>NOME</LabelList>
                  <p>{people.name}</p>
                </Description>

                <Description>
                  <LabelList>CPF</LabelList>
                  <p>{people.cpf}</p>
                </Description>
                <Date>
                  <LabelList>Data de registro</LabelList>
                  <p>{formatDate(people.updatedAt)}</p>
                </Date>
                <ButtonRegisterVisit
                  style={{ background: "green" }}
                  onClick={() => RegisterVisit(people)}
                ><Tooltip title={"Registrar visita"} arrow >

                    <TourIcon />
                  </Tooltip>
                  {/*ÍCONE DO BOTÃO DE REGISTRAR VISITAS*/}
                </ButtonRegisterVisit>

                <ButtonRegisterVisit onClick={() => EdititRegister(people)}>
                  <Tooltip title={"Editar pessoa"} arrow >
                    <EditIcon />
                  </Tooltip>

                </ButtonRegisterVisit>

                {!userData.admin ? (
                  <></>
                ) : (
                  <ButtonRegisterVisit
                    style={{ background: "red" }}
                    onClick={() => DeleteRegister(people.id)}
                  >
                    <PersonRemoveIcon />
                    {/**  <Tooltip/>*/}
                  </ButtonRegisterVisit>
                )}

                <ButtonFinaly>
                  <button
                    onClick={() => toggleMenu(people.id)}
                    style={{
                      transform: `rotate(${rotationAngles[people.id]}deg)`,
                    }}
                  >
                    <KeyboardDoubleArrowDownSharpIcon />
                  </button>
                </ButtonFinaly>
              </List>
              <CardContainer
                isVisible={openStates[people.id]}
                className={`menu ${openStates[people.id] ? "open" : ""}`}
              >
                <CardListPeople>
                  <div>
                    <LabelList>Nome: </LabelList>
                    <InforList>{people.name} </InforList>
                  </div>
                  <div style={{ gap: "8px" }}>
                    <LabelList>RG: </LabelList>
                    <InforList>{people.rg}</InforList>

                    <LabelList>CPF: </LabelList>
                    <InforList>{people.cpf}</InforList>
                  </div>
                  <div>
                    <LabelList>Telefone: </LabelList>
                    <InforList>{people.phone}</InforList>
                  </div>
                  <div>
                    <LabelList>E-mail: </LabelList>
                    <InforList>{people.email}</InforList>
                  </div>
                  <div>
                    <LabelList>Gênero: </LabelList>
                    <InforList>{people.gener}</InforList>
                  </div>
                  <div>
                    <LabelList>Dada de nascimento: </LabelList>
                    <InforList>{people.birth}</InforList>
                  </div>
                  <div>
                    <LabelList>Endereço: </LabelList>
                    <InforList>{people.address} </InforList>
                  </div>
                  <div>
                    <LabelList>n°: </LabelList>
                    <InforList>{people.numberhouse}</InforList>
                  </div>
                  <div>
                    <LabelList>CEP : </LabelList>
                    <InforList>{people.zipcode}</InforList>
                  </div>
                  <div>
                    <LabelList>Nome da mãe: </LabelList>
                    <InforList>{people.namemother}</InforList>
                  </div>
                  <div>
                    <LabelList>Nome do pai: </LabelList>
                    <InforList>{people.namefather}</InforList>
                  </div>
                </CardListPeople>
                <CardHistory>
                  <div className="searchdata">
                    <label>Busque pela data:</label>
                    <ReactInputMask
                      style={{ width: "80px" }}
                      mask="99/99/99"
                      placeholder="10/11/23"
                      onChange={handleDateSearch}
                    />
                  </div>
                  <span>Histórico de visitas</span>
                  <div>
                    {/* <div className="headerHistory">
                      {/* <LabelList>Entrada</LabelList>
                      <LabelList>Saída</LabelList> 
                    </div> */}
                    <div className="rolHistory">
                      {visitor &&
                        visitor.map((reg) =>
                          people.id === reg.visitPeople.id &&
                            (dateSearchTerm
                              ? formatDate(reg.dateEntry).includes(
                                dateSearchTerm
                              ) ||
                              formatDate(reg.departureDate).includes(
                                dateSearchTerm
                              )
                              : true) ? (
                            <ul key={reg._id}>
                              <li>
                                <div className="div">
                                  <span className="infoLeft">
                                    <LabelList>Local:</LabelList>
                                    <p>{reg.visitLocal}</p>
                                  </span>
                                  <span className="infoLeft">
                                    <LabelList>Motivo:</LabelList>
                                    <p>{reg.reason}</p>
                                  </span>
                                </div>
                                <div className="div">
                                  <span className="infoRight">
                                    <LabelList>Entrada</LabelList>
                                    <p>{formatDate(reg.dateEntry)}</p>
                                    <p>{reg.timeEntry} hrs</p>
                                  </span>

                                  <span className="infoRight">
                                    <LabelList>Saída</LabelList>
                                    <p>{formatDate(reg.departureDate)}</p>
                                    <p>{reg.departureTime} hrs</p>
                                  </span>
                                </div>
                              </li>
                            </ul>
                          ) : (
                            <React.Fragment key={reg._id}></React.Fragment>
                          )
                        )}
                    </div>
                  </div>
                </CardHistory>
              </CardContainer>
            </ContainerList>
          ))}
      </Container>

      <Dialog style={{ backgroundColor: '#4040405e' }} open={!!selectedImage} onClose={closeImageDialog}>
        <DialogTitle style={{ backgroundColor: '#262626' }} >Image Viewer</DialogTitle>
        <DialogContent style={{ backgroundColor: '#262626' }} >
          <img src={selectedImage} alt="Selected" style={{ width: '100%' }} />
        </DialogContent>
      </Dialog>


    </>
  );
}
