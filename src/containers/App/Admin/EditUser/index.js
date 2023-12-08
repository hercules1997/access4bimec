import React from "react";
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
  const navigate = useNavigate();
  const {
    state: { idUser },
  } = useLocation();

  const schema = Yup.object().shape({
    name: Yup.string(),
    usuario: Yup.string(),
    password: Yup.string(),
    admin: Yup.bool(),
    s2: Yup.bool(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const user = {
        name: data.name,
        usuario: data.usuario,
        password: data.password,
        admin: data.admin,
        s2: data.s2,
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
      navigate(paths.Users);
    }, 2000);
  };

  const handleChange = (e) => e.target.value;
  const handleChanges2 = (e) => e.target.value;

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
              <LabelList>Nome</LabelList>
              <input
                type="text"
                {...register("name")}
                defaultValue={idUser.name}
                placeholder="comandante"
                error={errors.name?.message}
              />
            </Cardform>
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
                      defaultChecked={idUser.admin === true}
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
                      defaultChecked={idUser.admin === false}
                      onChange={handleChange}
                      error={errors.admin?.message}
                    />
                    <ErrorMessage>{errors.admin?.message}</ErrorMessage>
                  </div>
                </span>
              </Cardform>

              <Cardform style={{ display: "flex" }}>
                <LabelList>É da 2ª Seção?</LabelList>
                <span style={{ display: "flex", gap: "8px" }}>
                  <div className="optionRadio">
                    <LabelTitle>Sim</LabelTitle>
                    <input
                      type="radio"
                      value="true"
                      {...register("s2")}
                      defaultChecked={idUser.s2 === true}
                      // checked={optionValues2 === "true"}
                      onChange={handleChanges2}
                      error={errors.s2?.message}
                    />
                  </div>

                  <div className="optionRadio">
                    <LabelTitle>Não</LabelTitle>
                    <input
                      type="radio"
                      value="false"
                      {...register("s2")}
                      // checked={optionValues2 === "false"}
                      defaultChecked={idUser.s2 === false}
                      onChange={handleChanges2}
                      error={errors.s2?.message}
                    />
                    <ErrorMessage>{errors.s2?.message}</ErrorMessage>
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
