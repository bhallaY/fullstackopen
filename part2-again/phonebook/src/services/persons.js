import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export function createPersonEntry(newPerson) {
  const req = axios.post(baseUrl, newPerson);
  return req.then((res) => res.data);
}

export function deletePersonEntry(id) {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => res.data);
}

export function updatePersonEntry(updatePerson) {
  console.log("updatePerson", updatePerson);
  console.log("path", `${baseUrl}/${updatePerson.id}`);
  const req = axios.put(`${baseUrl}/${updatePerson.id}`, updatePerson);
  console.log(req.then((res) => console.log(res.data)));
  return req.then((res) => res.data);
}
