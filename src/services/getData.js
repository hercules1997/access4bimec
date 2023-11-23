import api from "./api";

//  Criação de uma instância da api para melhorar a perfoirmace
const apiInstance = api.create();

export async function getVisits() {
  const { data } = await apiInstance.get("visits");
  const sortedPeople = data.sort((a, b) => a.name.localeCompare(b.name));
  console.log(data);
  return sortedPeople;
}
export async function getVisitsRegisters() {
  const { data } = await apiInstance.get("visits-registers");

  return data;
}

export async function getVisitStatus() {
  const { data } = await apiInstance.get("visits-registers");

  return data;
}
export async function getUsers() {
  const { data } = await apiInstance.get("users");

  return data;
}
