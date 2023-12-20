/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../../services/api";
import InputMask from "react-input-mask";

import * as Yup from "yup";

import {
  ButtonSubmit,
  Container,
  ContainerMaster,
  Divisor,
  Cardform,
  Items,
  LabelTitle,
  LabelUpload,
} from "./style";
import { ErrorMessage } from "../../../components/ErrorMessage";
import paths from "../../../constants";
import { useNavigate } from "react-router-dom";
import { WebCam } from "../../../components";
import { useEffect } from "react";

export function NewRegister() {
  const [fileName, setFileName] = useState(null);
  const [cepData, setCepData] = useState(null);
  const [logradouro, setLogradouro] = useState("");
  const [visit, setVisit] = useState();
  const [imagePreview, setImagePreview] = useState(null);


  const navigate = useNavigate();

  const fetchCepData = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      setCepData(data);

      if (data.logradouro) {
        setLogradouro(data.logradouro);
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setCepData(null);
    }
  };

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data: registro } = await api.get("visits");

        setVisit(registro);
      } catch (error) {
        console.log(error);
      }
    }

    loadOrders();
  }, []);
  const schema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigtório"),
    rg: Yup.string().required("RG é obrigtório"),
    cpf: Yup.string().required("CPF é obrigtório"),
    phone: Yup.string().required("Telefone é obrigtório"),
    email: Yup.string().email().required("E-mail é obrigtório"),
    gener: Yup.string().required("Gênero é obrigtório"),
    birth: Yup.string().required("Data de nascimento é obrigtório"),
    address: Yup.string().required("Endereço é obrigtório"),
    numberhouse: Yup.string().required("N° da residência é obrigtório"),
    zipcode: Yup.string().required("CEP é obrigtório"),
    namemother: Yup.string().required("Nome da mâe é obrigtório"),
    namefather: Yup.string().required("Nome do pai é obrigtório"),
    file: Yup.mixed()
      .test("required", "Carregue um arquivo de foto", (value) => {
        return value?.length > 0;
      })
      .test(
        "fileSize",
        "Arquivo muito grande! Por favor, carregue menor que 4MB",
        (value) => {
          return value[0]?.size <= 600000;
        }
      )
      .test("type", "Carregue arquivos apenas jpeg/png/blob/webp", (value) => {
        return (
          value[0]?.type === "image/blob" ||
          value[0]?.type === "image/jpeg" ||
          value[0]?.type === "image/png" ||
          value[0]?.type === "image/webp"
        );
      }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const checkDuplicateCpfOrRg = (cpf, rg) => {
    const isDuplicate = visit.some(
      (person) => person.cpf === cpf || person.rg === rg
    );
    return isDuplicate;
  };

  const onSubmit = async (data) => {
    try {
      const cpf = data.cpf;
      const rg = data.rg;
      if (checkDuplicateCpfOrRg(cpf, rg)) {
        toast.error(
          "Não é possível cadastrar o visitante. CPF ou RG já cadastrado."
        );
        return;
      }

      if (!cepData) {
        await fetchCepData(data.zipcode);
      }

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

      await toast.promise(api.post("visits", visitFormData), {
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
    setSelectedOption(e.target.value);
  };
  return (
    <Container>
      <ContainerMaster>
        <Items>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <h2>Cadastro de Visitante</h2>
            <LabelTitle>
              Nome Completo <span> *</span>
            </LabelTitle>
            <input
              type="text"
              {...register("name")}
              placeholder="Ex: Carlos Antônio"
              error={errors.name?.message}
            ></input>
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
            <Divisor>
              <Cardform>
                <LabelTitle className="Label_Format" style={{ width: "auto" }}>
                  RG <span>*</span>
                </LabelTitle>
                <InputMask
                  mask={"99.999.999-*" || "99.999.999-a"}
                  className="Label_Format"
                  {...register("rg")}
                  placeholder="Ex: 99.999.999-9"
                  error={errors.rg?.message}
                  required
                ></InputMask>
                <ErrorMessage>{errors.rg?.message}</ErrorMessage>
              </Cardform>
              <Cardform>
                <LabelTitle className="Label_Format" style={{ width: "auto" }}>
                  CPF <span>*</span>
                </LabelTitle>
                <InputMask
                  mask="999.999.999-99"
                  placeholder="Ex: 455.555.555-77"
                  {...register("cpf")}
                  error={errors.cpf?.message}
                  required
                ></InputMask>
                <ErrorMessage>{errors.cpf?.message}</ErrorMessage>
              </Cardform>
              <Cardform>
                <LabelTitle>
                  Tel <span>*</span>
                </LabelTitle>
                <InputMask
                  mask="(99) 99999-9999"
                  {...register("phone")}
                  placeholder="(11) 958478801"
                  error={errors.phone?.message}
                  required
                ></InputMask>
                <ErrorMessage>{errors.phone?.message}</ErrorMessage>
              </Cardform>
            </Divisor>
            <Divisor>
              <Cardform>
                <LabelTitle>
                  E-mail <span>*</span>
                </LabelTitle>
                <input
                  type="text"
                  {...register("email")}
                  placeholder="Ex: email@email.com"
                  error={errors.email?.message}
                  required
                ></input>
                <ErrorMessage>{errors.email?.message}</ErrorMessage>
              </Cardform>
              <Cardform>
                <LabelTitle>
                  Gênero <span>*</span>
                </LabelTitle>
                <select
                  {...register("gener")}
                  id="options"
                  onChange={handleChange}
                  value={selectedOption}
                  error={errors.gener?.message}
                  required
                >
                  <option value="" hidden >Selecione...</option>
                  {options.map((opcao, index) => (
                    <option key={index} value={opcao}>
                      {opcao}
                    </option>
                  ))}
                </select>

                <ErrorMessage>{errors.gener?.message}</ErrorMessage>
              </Cardform>
              <Cardform>
                <LabelTitle>
                  Data de nascimento <span>*</span>
                </LabelTitle>
                <InputMask
                  mask="99/99/9999"
                  {...register("birth")}
                  placeholder="Ex: 10/02/1997"
                  error={errors.birth?.message}
                  required
                ></InputMask>
                <ErrorMessage>{errors.birth?.message}</ErrorMessage>
              </Cardform>
            </Divisor>

            <Divisor>
              <Cardform style={{ width: "120px" }}>
                <LabelTitle className="Label_Format">
                  CEP <span>*</span>
                </LabelTitle>
                <InputMask
                  mask="99999-999"
                  {...register("zipcode")}
                  placeholder="Ex: 02222-555"
                  error={errors.zipcode?.message}
                  required
                  onChange={(e) => {
                    fetchCepData(e.target.value);
                  }}
                ></InputMask>
                <ErrorMessage>{errors.zipcode?.message}</ErrorMessage>
              </Cardform>
              <Cardform>
                <LabelTitle>
                  Rua <span>*</span>
                </LabelTitle>
                <input
                  type="text"
                  {...register("address")}
                  placeholder="Ex: Rua Tadeu de Brito"
                  value={logradouro || ""}
                  onChange={(e) => setLogradouro(e.target.value)}
                  error={errors.address?.message}
                  required
                ></input>
                <ErrorMessage>{errors.address?.message}</ErrorMessage>
              </Cardform>
              <Cardform style={{ width: "80px" }}>
                <LabelTitle>
                  n° <span>*</span>
                </LabelTitle>
                <input
                  type="text"
                  {...register("numberhouse")}
                  placeholder="Ex: 254"
                  error={errors.numberhouse?.message}
                  required
                ></input>
                <ErrorMessage>{errors.numberhouse?.message}</ErrorMessage>
              </Cardform>
            </Divisor>

            <Divisor></Divisor>
            <Divisor>
              <Cardform>
                <LabelTitle>
                  Nome da mãe<span>*</span>
                </LabelTitle>
                <input
                  type="text"
                  {...register("namemother")}
                  placeholder="Ex: Marta Antônia"
                  error={errors.namemother?.message}
                  required
                ></input>
                <ErrorMessage>{errors.namemother?.message}</ErrorMessage>
              </Cardform>
              <Cardform>
                <LabelTitle>
                  Nome do pai<span>*</span>
                </LabelTitle>
                <input
                  type="text"
                  {...register("namefather")}
                  placeholder="Ex: Pedro Antônio"
                  error={errors.namefather?.message}
                  required
                ></input>
                <ErrorMessage>{errors.namefather?.message}</ErrorMessage>
              </Cardform>
            </Divisor>

            <LabelTitle>
              Foto <span>*</span>
            </LabelTitle>
            <WebCam />
            <div>
              <LabelTitle>
                <LabelUpload>
                  {fileName && imagePreview ? (
                    <img src={imagePreview} alt="Imagem" style={{ maxWidth: '50%', maxHeight: '40%' }} />
                  ) : (
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
                    onChange={async (value) => {
                      setFileName(value.target.files[0]?.name);

                      const file = value.target.files[0];

                      // Ler a imagem e converter para uma URL de dados (data URL)
                      const reader = new FileReader();

                      reader.onloadend = () => {
                        setImagePreview(reader.result);
                      };

                      if (file) {
                        reader.readAsDataURL(file);
                      }
                    }}
                    error={errors.file?.message}
                  />
                </LabelUpload>
              </LabelTitle>
              <ErrorMessage>{errors.file?.message}</ErrorMessage>
            </div>
            <ButtonSubmit>Enviar</ButtonSubmit>
          </form>
        </Items>
      </ContainerMaster>
    </Container>
  );
}
