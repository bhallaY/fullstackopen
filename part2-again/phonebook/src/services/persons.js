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
  const req = axios.put(`${baseUrl}/${updatePerson.id}`, updatePerson);
  return req.then((res) => res.data);
}

export function getAllPersons() {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
}
