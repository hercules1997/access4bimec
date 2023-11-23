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
    usuario: Yup.string().required(),
    password: Yup.string().required(),
    admin: Yup.bool().required(),
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
  // const [selectedOption, setSelectedOption] = useState("");
  // const options = ["Sim", "Não"];

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
