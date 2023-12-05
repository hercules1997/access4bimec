import React from "react";
import { ContainerItens, CardRegister, ButtonStyle } from "./style.js";

import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import paths from "../../../../constants/index.js";
import api from "../../../../services/api.js";
import { useState } from "react";
import { ErrorMessage } from "../../../../components/index.js";
import { Cardform, Divisor, LabelTitle } from "../../NewRegister/style.js";
import { LabelList } from "../../ListPeopleRegister/style.js";

export const NewUsers = () => {
  const navigate = useNavigate();

  const location = useNavigate();

  const [optionValue, setOptionValue] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    usuario: Yup.string().required("usuário é obrigatório"),
    password: Yup.string().required("Senha é obrigatória"),
    admin: Yup.bool().required("Campo obrigatório"),
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
      };
      await toast.promise(api.post("users", user), {
        pending: "Registrando usuário no banco de dados...",
        success: "Usuário registrado com sucesso!",
        error: "Falha ao registrar, por favor tente novamente!",
      });
    } catch (error) {
      console.error("Algum dado na validação não esta sendo passada", error);
    }

    setTimeout(() => {
      navigate(paths.Users);
    }, 2000);
  };

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setOptionValue(selectedValue);
  };

  return (
    <ContainerItens>
      <CardRegister>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Novo usuário</h2>
          <Cardform>
              <LabelList>Digíte nome completoo</LabelList>
              <input
                type="text"
                {...register("name")}
                placeholder="João da Silva"
                error={errors.name?.message}
              />
            </Cardform>
   
            <Cardform>
              <LabelList>Digíte um nome para usuário</LabelList>
              <input
                type="text"
                {...register("usuario")}
                placeholder="comandante"
                error={errors.usuario?.message}
              />
            </Cardform>
     
            <Cardform>
              <LabelList>Digite uma senha</LabelList>
              <input
                type="password"
                {...register("password")}
                placeholder="aaa111"
                error={errors.password?.message}
              />
            </Cardform>
          <Divisor style={{ display: "flex" }}>
            <Cardform style={{ display: "flex" }}>
              <LabelList>Administrador?</LabelList>
              <span style={{ display: "flex", gap: "8px" }}>
                <div className="optionRadio">
                  <LabelTitle>Sim</LabelTitle>
                  <input
                    type="radio"
                    value="true"
                    {...register("admin")}
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
                    onChange={handleChange}
                    error={errors.admin?.message}
                  />
                  <ErrorMessage>{errors.admin?.message}</ErrorMessage>
                </div>
              </span>
            </Cardform>
          </Divisor>
          <div className="container-button">
            <ButtonStyle
              style={{ background: "red" }}
              type="button"
              onClick={() => location(paths.Users)}
            >
              Sair
            </ButtonStyle>
            <ButtonStyle style={{ background: "green" }}>Criar</ButtonStyle>
          </div>
        </form>
      </CardRegister>
    </ContainerItens>
  );
};
