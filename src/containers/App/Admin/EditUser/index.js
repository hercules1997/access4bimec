import React, { useState } from "react";
import {
  Container,
  ContainerMaster,
  Divisor,
  Cardform,
  Items,
  LabelTitle,
} from "./style.js";

import "moment/locale/pt-br";

import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../../services/api.js";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../../../components/index.js";
import { ButtonStyle } from "../NewUsers/style.js";
import { LabelList } from "../../ListPeopleRegister/style.js";
import paths from "../../../../constants/index.js";

export const EditUser = () => {
  const [optionValue, setOptionValue] = useState(false);

  const navigate = useNavigate();
  const {
    state: { idUser },
  } = useLocation();

  const schema = Yup.object().shape({
    usuario: Yup.string(),
    passwod: Yup.string(),
    admin: Yup.bool(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const user = {
        usuario: data.usuario,
        password: data.passwod,
        admin: data.admin,
      };

      await toast.promise(api.put(`users/${idUser.id}`, user), {
        pending: "Editando usuário...",
        success: "usuário editado com sucesso!",
        error: "Falha ao editar, por favor tente novamente!",
      });
    } catch (error) {
      console.error("Algum dado na validação não esta sendo passada", error);
    }

    setTimeout(() => {
      navigate(paths.ListRegisters);
    }, 2000);
  };

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setOptionValue(selectedValue);
  };

  return (
    <Container>
      <ContainerMaster>
        <button className="buttonBack" onClick={() => navigate(paths.Users)}>
          X
        </button>
        <Items>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Edição de usuário</h2>

            <Cardform>
              <LabelList>Usuário</LabelList>
              <input
                type="text"
                {...register("usuario")}
                defaultValue={idUser.usuario}
                placeholder="comandante"
                error={errors.usuario?.message}
              />
            </Cardform>

            <Cardform>
              <LabelList>Digite uma senha</LabelList>
              <input
                type="password"
                {...register("password")}
                defaultValue={idUser.password}
                placeholder="aaa111"
                error={errors.password?.message}
              />
            </Cardform>
            <Divisor style={{ display: "flex" }}>
              <Cardform style={{ display: "flex" }}>
                <LabelList>Administrador</LabelList>
                <span style={{ display: "flex", gap: "8px" }}>
                  <div className="optionRadio">
                    <LabelTitle>Sim</LabelTitle>
                    <input
                      type="radio"
                      value="true"
                      {...register("admin")}
                      defaultValue={idUser.admin}
                      checked={optionValue === "true"}
                      onChange={handleChange}
                      error={errors.admin?.message}
                    />
                  </div>

                  <div className="optionRadio">
                    <LabelTitle>Não</LabelTitle>
                    <input
                      type="radio"
                      value="false"
                      {...register("admin")}
                      checked={optionValue === "false"}
                      defaultValue={idUser.admin}
                      onChange={handleChange}
                      error={errors.admin?.message}
                    />
                    <ErrorMessage>{errors.admin?.message}</ErrorMessage>
                  </div>
                </span>
              </Cardform>
            </Divisor>

            <ButtonStyle style={{ background: "green" }}>Alterar</ButtonStyle>
          </form>
        </Items>
      </ContainerMaster>
    </Container>
  );
};
