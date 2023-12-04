import React, { useState } from "react";
import {
  ButtonSubmit,
  Container,
  ContainerMaster,
  Divisor,
  Cardform,
  Items,
  LabelTitle,
  LabelUpload,
} from "./style.js";
import paths from "../../../constants/index.js";
import "moment/locale/pt-br";
import { WebCam } from "../../../components";

import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../services/api.js";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { ErrorMessage } from "../../../components/index.js";

export const EditRegister = () => {
  const [fileName, setFileName] = useState(null);

  const navigate = useNavigate();
  const {
    state: { peopleVisit },
  } = useLocation();
  // const location = useNavigate();

  const schema = Yup.object().shape({
    name: Yup.string(),
    rg: Yup.string(),
    cpf: Yup.string(),
    phone: Yup.string(),
    email: Yup.string().email(),
    birth: Yup.string(),
    gener: Yup.string(),
    address: Yup.string(),
    numberhouse: Yup.string(),
    zipcode: Yup.string(),
    namemother: Yup.string(),
    namefather: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const visitFormData = new FormData();
      visitFormData.append("name", data.name);
      visitFormData.append("rg", data.rg);
      visitFormData.append("cpf", data.cpf);
      visitFormData.append("phone", data.phone);
      visitFormData.append("email", data.email);
      visitFormData.append("gener", data.gener);
      visitFormData.append("birth", data.birth);
      visitFormData.append("address", data.address);
      visitFormData.append("numberhouse", data.numberhouse);
      visitFormData.append("zipcode", data.zipcode);
      visitFormData.append("namemother", data.namemother);
      visitFormData.append("namefather", data.namefather);
      visitFormData.append("file", data.file[0]);

      await toast.promise(api.put(`visits/${peopleVisit.id}`, visitFormData), {
        pending: "Registrando Serviço...",
        success: "Serviço registrado com sucesso!",
        error: "Falha ao registrar, por favor tente novamente!",
      });
    } catch (error) {
      console.error("Algum dado na validação não esta sendo passada", error);
    }

    setTimeout(() => {
      navigate(paths.ListRegisters);
    }, 2000);
  };
  const options = ["Masculino", "Feminino", "Outros"];
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
  };

  return (
    <Container>
      <ContainerMaster>
        <button
          className="buttonBack"
          onClick={() => navigate(paths.ListRegisters)}
        >
          X
        </button>
        <Items>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <LabelTitle>Nome completo</LabelTitle>
            <input
              type="text"
              {...register("name")}
              defaultValue={peopleVisit.name}
              error={errors.name?.message}
            ></input>
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
            <Divisor>
              <Cardform>
                <LabelTitle className="Label_Format" style={{ width: "auto" }}>
                  RG
                </LabelTitle>
                <InputMask
                  mask="99.999.999-*"
                  className="Label_Format"
                  {...register("rg")}
                  defaultValue={peopleVisit.rg}
                  error={errors.rg?.message}
                  required
                ></InputMask>
                <ErrorMessage>{errors.rg?.message}</ErrorMessage>
              </Cardform>
              <Cardform>
                <LabelTitle className="Label_Format" style={{ width: "auto" }}>
                  CPF
                </LabelTitle>
                <InputMask
                  mask="999.999.999-99"
                  defaultValue={peopleVisit.cpf}
                  {...register("cpf")}
                  error={errors.cpf?.message}
                  required
                ></InputMask>
                <ErrorMessage>{errors.cpf?.message}</ErrorMessage>
              </Cardform>
              <Cardform>
                <LabelTitle>Tel</LabelTitle>
                <InputMask
                  mask="(99) 99999-9999"
                  {...register("phone")}
                  defaultValue={peopleVisit.phone}
                  error={errors.phone?.message}
                  required
                ></InputMask>
                <ErrorMessage>{errors.phone?.message}</ErrorMessage>
              </Cardform>
            </Divisor>
            <Divisor>
              <Cardform>
                <LabelTitle>E-mail</LabelTitle>
                <input
                  type="text"
                  {...register("email")}
                  defaultValue={peopleVisit.email}
                  error={errors.email?.message}
                  required
                ></input>
                <ErrorMessage>{errors.email?.message}</ErrorMessage>
              </Cardform>
              <Cardform>
                <LabelTitle>Gênero</LabelTitle>
                <select
                  {...register("gener")}
                  id="options"
                  onChange={handleChange}
                  value={selectedOption}
                  defaltValue={peopleVisit.gener}
                  error={errors.gener?.message}
                  required
                >
                  <option value={peopleVisit.gener}>{peopleVisit.gener}</option>
                  {options.map((opcao, index) => (
                    <option key={index} value={opcao}>
                      {opcao}
                    </option>
                  ))}
                </select>

                <ErrorMessage>{errors.gener?.message}</ErrorMessage>
              </Cardform>
              <Cardform>
                <LabelTitle>Data de nascimento</LabelTitle>
                <InputMask
                  mask="99/99/9999"
                  {...register("birth")}
                  defaultValue={peopleVisit.birth}
                  error={errors.birth?.message}
                  required
                ></InputMask>
                <ErrorMessage>{errors.birth?.message}</ErrorMessage>
              </Cardform>
            </Divisor>

            <Divisor>
              <Cardform style={{ width: "120px" }}>
                <LabelTitle className="Label_Format">CEP</LabelTitle>
                <InputMask
                  mask="99999-999"
                  {...register("zipcode")}
                  defaultValue={peopleVisit.zipcode}
                  error={errors.zipcode?.message}
                  required
                ></InputMask>
                <ErrorMessage>{errors.zipcode?.message}</ErrorMessage>
              </Cardform>
              <Cardform>
                <LabelTitle>Rua</LabelTitle>
                <input
                  type="text"
                  {...register("address")}
                  defaultValue={peopleVisit.address}
                  error={errors.address?.message}
                  required
                ></input>
                <ErrorMessage>{errors.address?.message}</ErrorMessage>
              </Cardform>
              <Cardform style={{ width: "80px" }}>
                <LabelTitle>n°</LabelTitle>
                <input
                  type="text"
                  {...register("numberhouse")}
                  defaultValue={peopleVisit.numberhouse}
                  error={errors.numberhouse?.message}
                  required
                ></input>
                <ErrorMessage>{errors.numberhouse?.message}</ErrorMessage>
              </Cardform>
            </Divisor>

            <Divisor></Divisor>
            <Divisor>
              <Cardform>
                <LabelTitle>Nome da mãe</LabelTitle>
                <input
                  type="text"
                  {...register("namemother")}
                  defaultValue={peopleVisit.namemother}
                  error={errors.namemother?.message}
                  required
                ></input>
                <ErrorMessage>{errors.namemother?.message}</ErrorMessage>
              </Cardform>
              <Cardform>
                <LabelTitle>Nome do pai</LabelTitle>
                <input
                  type="text"
                  {...register("namefather")}
                  defaultValue={peopleVisit.namefather}
                  error={errors.namefather?.message}
                  required
                ></input>
                <ErrorMessage>{errors.namefather?.message}</ErrorMessage>
              </Cardform>
            </Divisor>
            <WebCam />
            <LabelTitle>Foto</LabelTitle>
            <div>
              <LabelTitle>
                <LabelUpload>
                  {fileName || (
                    <>
                      <span />
                      Carregar imagem
                    </>
                  )}
                  <input
                    type="file"
                    id="image-input"
                    accept="image/png, image/jpeg"
                    {...register("file")}
                    onChange={(value) => {
                      setFileName(value.target.files[0]?.name);
                    }}
                    error={errors.file?.message}
                  />
                </LabelUpload>
              </LabelTitle>
              <ErrorMessage>{errors.file?.message}</ErrorMessage>
            </div>
            <ButtonSubmit>Editar</ButtonSubmit>
          </form>
        </Items>
      </ContainerMaster>
    </Container>
  );
};
