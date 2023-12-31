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
  const [optionValue2, setOptionValue2] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    usuario: Yup.string()
      .required("Usuário é obrigatório")
      .test("check-usuario", "Usuário já existe", async function (value) {
        if (!value) {
          return true; // Não faz a verificação se o campo está vazio
        }

        try {
          // Faz a chamada para verificar se o usuário já existe
          const { data } = await api.get(`/users`);
          const allusers = data;

          // Verifica se algum usuário já possui o mesmo nome de usuário
          const userExists = allusers.some((user) => user.usuario === value);

          return !userExists;
        } catch (error) {
          console.error("Erro ao verificar a existência do usuário:", error);
          return false;
        }
      }),
    password: Yup.string()
      .required("Senha é obrigatória")
      .min(6, "Senha deve conter no mínimo 6 caracteres"),
    confirmPassword: Yup.string()
      .required("Comfime sua senha")
      .oneOf([Yup.ref("password")], "Senha diferente"),
    admin: Yup.bool().required("Campo obrigatório"),
    s2: Yup.bool().required("Campo obrigatório"),
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
      await toast.promise(api.post("users", user), {
        pending: "Registrando usuário no banco de dados...",
        success: "Usuário registrado com sucesso!",
        error: "Falha ao registrar, por favor tente novamente!",
      });
    } catch (error) {
      console.error(
        "Algum dado na validação não esta sendo passada corretamente",
        error
      );
    }

    setTimeout(() => {
      navigate(paths.Users);
    }, 2000);
  };

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setOptionValue(selectedValue);
  };

  const handleChanges2 = (e) => {
    const selectedValue2 = e.target.value;
    setOptionValue2(selectedValue2);
  };
  return (
    <ContainerItens>
      <CardRegister>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Novo usuário</h2>
          <Cardform>
            <LabelList>Digíte Nome Completo</LabelList>
            <input
              type="text"
              {...register("name")}
              placeholder="Ex: João da Silva"
              error={errors.name?.message}
            />
          </Cardform>

          <Cardform>
            <LabelList>Digíte um nome para usuário</LabelList>
            <input
              type="text"
              {...register("usuario")}
              placeholder="Ex: comandante"
              error={errors.usuario?.message}
            />
            <ErrorMessage>{errors.usuario?.message}</ErrorMessage>
          </Cardform>

          <Cardform>
            <LabelList>Digite uma senha</LabelList>
            <input
              type="password"
              {...register("password")}
              placeholder="Ex: Joao111"
              error={errors.password?.message}
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </Cardform>
          <Cardform>
            <LabelList>Confirmar a senha</LabelList>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="Ex: Joao111"
              error={errors.confirmPassword?.message}
            />
            <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
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
          <Divisor style={{ display: "flex" }}>
            <Cardform style={{ display: "flex" }}>
              <LabelList>s2?</LabelList>
              <span style={{ display: "flex", gap: "8px" }}>
                <div className="optionRadio">
                  <LabelTitle>Sim</LabelTitle>
                  <input
                    type="radio"
                    value="true"
                    {...register("s2")}
                    checked={optionValue2 === "true"}
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
                    checked={optionValue2 === "false"}
                    onChange={handleChanges2}
                    error={errors.s2?.message}
                  />
                  <ErrorMessage>{errors.s2?.message}</ErrorMessage>
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
