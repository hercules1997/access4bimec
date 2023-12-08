import axios from "axios";

// Exportação da API
const api = axios.create({
     baseURL: "http://192.168.56.1:3008",

  //  baseURL: "https://10.12.112.24:3008",
});

//Verificação do token para o usuario acessar aplicação
  api.interceptors.request.use(async (config) => {
    const userData = await localStorage.getItem("acesso4bimec:users");
    const token = userData && JSON.parse(userData).token;
    config.headers.authorization = `Bearer ${token}`;

    return config;
  });

export default api;
