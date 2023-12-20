import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage } from "../../../components";
import paths from "../../../constants";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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
  //estado para rastrear se o Caps Lock está ligado
  const [capsLockWarning, setCapsLockWarning] = useState(false);
  // estado para visualizar senha
  const [showPassword, setShowPassword] = useState(false);
  const currentYear = new Date().getFullYear();
  // Função para lidar com a tecla pressionada
  const handleKeyPress = (e) => {
    const isCapsLockOn = e.getModifierState("CapsLock");
    setCapsLockWarning(isCapsLockOn);
  };
  /*
   VALIDAÇÃO DO FORMULÁRIO COM YUP
  */

  const schema = Yup.object().shape({
    usuario: Yup.string().required("Usuario é obrigatório"),
    password: Yup.string()
      .required("Senha é obrigatória")
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
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
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
  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <All>
      <ContainerMaster>
        <BackgroundStyle />
        <ContainerBlock>
          <ContainerItens>
            {/* FORMULÁRIO */}
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <h2>Controle de Acesso do 4° BI Mec</h2>

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
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      error={errors.password?.message}
                      required
                      // evento onKeyPress para verificar o Caps Lock
                      onKeyPress={handleKeyPress}
                    />
                    {/* Botão com ícone para alternar a visibilidade da senha */}
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        color: '#fff',
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
              
                </div>
                {/* Exiba o aviso se o Caps Lock estiver ligado */}
                {capsLockWarning && (
                  <ErrorMessage>Caps Lock está ativo!</ErrorMessage>
                )}
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
              </BlockAccess>
              {/* BOTÃO DE ACESSO */}

              <ButtonStyle>Entrar</ButtonStyle>
            </form>
          </ContainerItens>
        </ContainerBlock>
      </ContainerMaster>
      <span style={{ color: "#ffff" }}>
        Copyright © {currentYear} Hércules C Andrade - Desenvolvedor de Software.
        Todos os Direitos Reservados.
      </span>
    </All>
  );
}
