/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import {
  Container,
  ContainerList,
  Date,
  Description,
  LabelList,
  List,
  ButtonRegisterVisit,
} from "./style";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../services/api";
import paths from "../../../../constants";
import formatDate from "../../../../utils/formatDate";

export function Users() {
  const [users, setUsers] = useState();
  const location = useNavigate();

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data } = await api.get("users");
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadOrders();
  }, []);

  function EditUser(idUser) {
    location(paths.EditUser, { state: { idUser } });
  }

  async function DeleteUser(id) {
    await toast.promise(api.delete(`users/${id}`), {
      success: "Usuário deletada com sucesso!",
      error: "Falha ao Deletar usuário",
      pending: "Deletando usuário no banco de dados",
    });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }


  return (
    <>
      <Container>
        {users &&
          users.map((user) => (
            <ContainerList key={user.id}>
              <List>
                <Description>
                  <LabelList>Usuario</LabelList>
                  <p>{user.usuario}</p>
                </Description>
                <Date>
                  <LabelList>Data de registro</LabelList>
                  <p>{formatDate(user.updatedAt)}</p>
                </Date>

                <ButtonRegisterVisit
                  style={{ background: "orange" }}
                  onClick={() => EditUser(user)}
                >
                  Editar Pessoa
                </ButtonRegisterVisit>
                <ButtonRegisterVisit
                  style={{ background: "red" }}
                  onClick={() => DeleteUser(user.id)}
                >
                  Deletar Pessoa
                </ButtonRegisterVisit>
              </List>
            </ContainerList>
          ))}
      </Container>
    </>
  );
}
