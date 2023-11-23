import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage } from "../../../components";
import paths from "../../../constants";
// import { useNetworkState } from "@uidotdev/usehooks";
import {
  ContainerBlock,
  ContainerItens,
  Label,
  ContainerMaster,
  ButtonStyle,
  BackgroundStyle,
  All,
  BlockAccess,
} from "./style";
import api from "../../../services/api";
import { useUser } from "../../../hooks/UserContext";
import { toast } from "react-toastify";

/*
ESTRUTURA DE LOGIN
*/

export function Login() {
  const { putUserData } = useUser();
  const navigate = useNavigate();
// const network = useNetworkState();

  /*
   VALIDAÇÃO DO FORMULÁRIO COM YUP
  */

  const schema = Yup.object().shape({
    usuario: Yup.string().required("obrigátorio"),
    password: Yup.string("Senha é obrigatória")
      .required()
      .min(6, "Senha deve ter no mínimo 6 digitos"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  /*
   CHAMADA A API E REALIZA O ACESSO
   */
  const onSubmit = async (clientData) => {
    try {
      const { data } = await toast.promise(
        api.post("sessions", {
          usuario: clientData.usuario,
          password: clientData.password,
        }),
        {
          pending: "Verificando seus dados...",
          success: "Seja bem-vindo(a)!",
          error: "Dados incorretos. Verifique e tente novamente!",
        }
      );
      putUserData(data);

      setTimeout(() => {
        navigate(paths.ListRegisters);
      }, 1200);
    } catch (error) {
      console.error("Usuário não existe", error);
    }
  };

  return (
    <All>
      <ContainerMaster>
        {/* <section style={{ color: '#fff'}} >
          <h1>Conexão</h1>
          <div>
            <span>
              {Object.keys(network).map((key) => {
                return (
                  <p key={key} className={key}>
                    <p>{key}</p>
                    <p>{`${network[key]}`}</p>
                  </p>
                );
              })}
            </span>
          </div>
        </section> */}
        <BackgroundStyle />
        <ContainerBlock>
          <ContainerItens>
            {/* FORMULÁRIO */}
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <h2>Sistema de Controle de Acesso ao 4° BI Mec</h2>

              {/* USUÁRIO */}
              <BlockAccess>
                <h3>Login</h3>
                <div>
                  <Label>Usuário</Label>
                  <input
                    type="text"
                    {...register("usuario")}
                    error={errors.usuario?.message}
                    required
                  />
                </div>
                <ErrorMessage>{errors.usuario?.message}</ErrorMessage>
                <div>
                  {/* SENHA */}
                  <Label>Senha</Label>
                  <input
                    type="password"
                    {...register("password")}
                    error={errors.password?.message}
                    required
                  />
                </div>

                <ErrorMessage>{errors.password?.message}</ErrorMessage>
              </BlockAccess>
              {/* BOTÃO DE ACESSO */}

              <ButtonStyle>Entrar</ButtonStyle>
            </form>
          </ContainerItens>
        </ContainerBlock>
      </ContainerMaster>
      <span style={{ color: "#ffff" }}>
        Copyright © 2023 Hércules C Andrade - Desenvolvedor de Software. 
        Todos os Direitos Reservados.
      </span>
    </All>
  );
}
