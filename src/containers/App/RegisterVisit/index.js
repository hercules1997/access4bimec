import React, { useState } from "react";
import { ContainerItens, CardRegister, ButtonStyle } from "./style.js";
import paths from "../../../constants/index.js";
import moment from "moment-timezone";
import "moment/locale/pt-br";

import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/api.js";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { Cardform, Divisor, LabelTitle } from "../NewRegister/style.js";
import { ErrorMessage } from "../../../components/index.js";

export const RegisterVisit = () => {
  const [showVehicleFields, setShowVehicleFields] = useState(false);
  const [vehicleOption, setVehicleOption] = useState(false);
  const navigate = useNavigate();
  const {
    state: { peopleVisit },
  } = useLocation();
  const location = useNavigate();

  const schema = Yup.object().shape({
    visitLocal: Yup.string().required("Local da visita é obrigatório"),
    reason: Yup.string().required("Motivo da visita é obrigatório"),
    vehicle: Yup.bool().required("Opção obrigatória"),
    plate: Yup.string().required(),
    brand: Yup.string(),
    model: Yup.string(),
    color: Yup.string(),
    badge: Yup.string().required("N° do crachá é obrigatório"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const fusoHorarioBrasilia = "America/Sao_Paulo";

  const dataHoraAtualBrasilia = moment().tz(fusoHorarioBrasilia);
  const dataAmanha = dataHoraAtualBrasilia.clone().add(1, "days");

  const dateEntryData = dataAmanha.format("YYYY-MM-DD");
  const timeEntryTime = dataHoraAtualBrasilia.format("HH:mm");
  const diaSemana = dataHoraAtualBrasilia.format("dddd");

  const onSubmit = async (data) => {
    try {
      const visitRegisterBD = {
        visitLocal: data.visitLocal,
        reason: data.reason,
        vehicle: data.vehicle,
        plate: data.plate,
        brand: data.brand,
        model: data.model,
        color: data.color,
        badge: data.badge,
        dateEntry: dateEntryData,
        timeEntry: timeEntryTime,
        departureDate: "",
        departureTime: "",
        dayOfTheWeek: diaSemana,
      };
      console.log(data.plate)
      await toast.promise(
        api.post(`visits-registers/${peopleVisit.id}`, visitRegisterBD),
        {
          pending: "Registrando no banco de dados...",
          success: "Registrado no banco de dados com sucesso!",
          error: "Falha ao registrar, por favor tente novamente!",
        }
      );
    } catch (error) {
      console.error("Algum dado na validação não esta sendo passada", error);
    }

    setTimeout(() => {
      navigate(paths.Status);
    }, 2000);
  };

  const options = [
    "Pavilhão de Comando",
    "Secretaria",
    "Rancho",
    "Almoxarifado",
    "BMS",
    "RP",
    "Campo de Futebol",
    "PMT",
    "Museu",
    "DEF",
    "Telheiro",
    "HOTRAN",
    "Conpanhia",
    "Alfaiataria",
    "Barbearia",
    "S1",
    "S2",
    "S3",
    "S4",
    "PC Cmt",
    "PC SCmt",
  ];
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
  };

  const handleVehicle = (e) => {
    setVehicleOption(e.target.value)
    setShowVehicleFields(e.target.value === "true");
  }

  return (
    <ContainerItens>
      <CardRegister>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <h2>Nova visita</h2>
          <LabelTitle>Possui veículo?</LabelTitle>
          <Divisor>
            <div className="optionRadio">
              <LabelTitle>Sim</LabelTitle>
              <input
                type="radio"
                value="true"
                {...register("vehicle")}
                checked={vehicleOption === "true"}
                onChange={handleVehicle}
                error={errors.vehicle?.message}
              />
            </div>
            <div className="optionRadio">
              <LabelTitle>Não</LabelTitle>
              <input
                type="radio"
                value="false"
                {...register("vehicle")}
                checked={vehicleOption === "false"}
                onChange={handleVehicle}
                error={errors.vehicle?.message}
              />
              <ErrorMessage>{errors.vehicle?.message}</ErrorMessage>
            </div>
          </Divisor>
          <Divisor>
            <Cardform>
              <LabelTitle>Motivo da visita</LabelTitle>
              <input
                type="text"
                {...register("reason")}
                placeholder="Entrega de carne"
                error={errors.reason?.message}
              />
              <ErrorMessage>{errors.reason?.message}</ErrorMessage>
            </Cardform>
            <Cardform>
              <LabelTitle>Local de visita</LabelTitle>
              <select
                {...register("visitLocal")}
                id="options"
                onChange={handleChange}
                value={selectedOption.toString()}
                error={errors.visitLocal?.message}
                required
              >
                <option value="" hidden>
                  Selecione...
                </option>
                {options.map((opcao, index) => (
                  <option key={index} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>
              <ErrorMessage>{errors.visitLocal?.message}</ErrorMessage>
            </Cardform>
          </Divisor>
          {showVehicleFields && (
            <>
              <Divisor>
                <Cardform>
                  <LabelTitle>Placa do veículo:</LabelTitle>
                  <InputMask
                    mask={"aaa-9*99" || "aaa-9999"}
                    {...register("plate")}
                    placeholder="DFR-3A44"
                    error={errors.plate?.message}
                  />
                  <ErrorMessage>{errors.plate?.message}</ErrorMessage>
                </Cardform>
                {/*
            // TODO CRIAR UMA FUNCIONALIDADE DE CONDIÇÃO PARA REGISTRAR VIATURAS E REGISTRAR TAMBEM NOME DO MOTORISTA E OM (NÃO ESQUECER DE CRIA AS FUNCIONALIDADES NO BACKEND E CADATRO NO BANCO DE DADOS)

               <Cardform>
                  <LabelTitle>N° EB (Se for viatura)</LabelTitle>
                  <InputMask
                    mask={"99999999"}
                    {...register("plate")}
                    placeholder="000002547"
                    error={errors.plate?.message}
                  />
                </Cardform>*/}
                <Cardform>
                  <LabelTitle>Marca</LabelTitle>
                  <input
                    type="text"
                    {...register("brand")}
                    placeholder="Wolkswagem"
                    error={errors.brand?.message}
                  />
                </Cardform>
              </Divisor>
              <Divisor>
                <Cardform>
                  <LabelTitle>Modelo</LabelTitle>
                  <input
                    type="text"
                    {...register("model")}
                    placeholder="Gol"
                    error={errors.model?.message}
                  />
                </Cardform>
                <Cardform>
                  <LabelTitle>Cor</LabelTitle>
                  <input
                    type="text"
                    {...register("color")}
                    placeholder="Azul"
                    error={errors.color?.message}
                  />
                </Cardform>
              </Divisor>
            </>
          )}

          <LabelTitle>N° do crachá</LabelTitle>
          <input
            style={{ width: "60px" }}
            type="text"
            {...register("badge")}
            placeholder="01"
            error={errors.badge?.message}
          />
          <ErrorMessage>{errors.badge?.message}</ErrorMessage>
          <span className="container-button">
            <ButtonStyle>Registrar</ButtonStyle>

            <ButtonStyle
              style={{ background: "red" }}
              type="button"
              onClick={() => location(paths.ListRegisters)}
            >
              Fechar
            </ButtonStyle>
          </span>
        </form>
      </CardRegister>
    </ContainerItens>
  );
};
