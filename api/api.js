import axios from "axios";
import { baseUrl } from "~/types/constants";

export const getNotesApi = () => {
  return axios.get(baseUrl);
};

export const updateNoteApi = (note) => {
  return axios.put(`${baseUrl}/${note.id}`, note, {
    headers: { "Content-type": "application/json" },
  });
};

export const deleteNoteApi = (note) => {
  return axios.delete(`${baseUrl}/${note.id}`);
};

export const addNewNoteApi = (note) => {
  return axios.post(baseUrl, note, {
    headers: { "Content-type": "application/json" },
  });
};
