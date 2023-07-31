import {
  addNewNoteApi,
  deleteNoteApi,
  getNotesApi,
  updateNoteApi,
} from "~/api/api";

export const state = () => ({
  notes: [],
  currentNote: null,
});

export const mutations = {
  SET_NOTES(state, data) {
    state.notes = data;
  },

  SET_CURRENT_NOTE(state, note) {
    state.currentNote = note;
  },

  CLEAR_CURRENT_NOTE(state) {
    state.currentNote = null;
  },

  UPDATE_NOTES(state, note) {
    const indexOfCurrentNotes = state.notes.findIndex(
      (el) => el.id === note.id
    );
    state.notes.splice(indexOfCurrentNotes, 1, note);
  },

  DELETE_NOTE(state, note) {
    const notesAfterDeletedOneOfThis = state.notes.filter(
      (el) => el.id !== note.id
    );
    state.notes = notesAfterDeletedOneOfThis;
  },

  ADD_NEW_NOTE(state, note) {
    state.notes = [...this.state.notes, note];
  },
};

export const actions = {
  // получить все заметки на стороне сервера
  async nuxtServerInit({ dispatch }) {
    await dispatch("getNotes");
  },

  //получить все заметки
  getNotes({ commit }) {
    return getNotesApi().then((res) => {
      commit("SET_NOTES", res.data);
    });
  },

  setCurrentNote({ commit }, note) {
    commit("SET_CURRENT_NOTE", note);
  },

  //редактировать заметку
  updateNote({ commit }, note) {
    return updateNoteApi(note).then((res) => {
      commit("UPDATE_NOTES", res.data);
    });
  },

  //удалить заметку
  deleteNote({ commit }, note) {
    return deleteNoteApi(note).then((res) => {
      commit("DELETE_NOTE", res.data);
    });
  },

  //добавить новую заметку
  addNewNote({ commit }, note) {
    return addNewNoteApi(note).then((res) => {
      commit("ADD_NEW_NOTE", res.data);
    });
  },

  clearCurrentNote({ commit }) {
    commit("CLEAR_CURRENT_NOTE");
  },
};
