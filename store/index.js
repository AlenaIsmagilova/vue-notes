import axios from "@/plugins/axios";

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
  //получить все заметки на стороне сервера
  async nuxtServerInit({ dispatch }) {
    await dispatch("getNotes");
  },

  //получить все заметки
  getNotes({ commit }) {
    return axios.get("http://localhost:1337/api/notes").then((res) => {
      console.log(res.data.data);
      const formattedData = res.data.data.map((el) => {
        return {
          ...el.attributes,
          id: el.id,
          timeForNotification:
            el.attributes.timeForNotification?.slice(0, -4) || null,
        };
      });

      commit("SET_NOTES", formattedData);
    });
  },

  setCurrentNote({ commit }, note) {
    commit("SET_CURRENT_NOTE", note);
  },

  //редактировать заметку
  updateNote({ commit }, note) {
    return axios
      .put(
        `http://localhost:1337/api/notes/${note.id}`,
        {
          data: {
            title: note.title,
            description: note.description,
            author: note.author,
            importance: note.importance,
            isEveryDayNotification: note.isEveryDayNotification,
            timeForNotification: note.timeForNotification,
            ...note,
          },
        },
        {
          headers: { "Content-type": "application/json" },
        }
      )
      .then((res) => {
        const formattedTime =
          res.data.data.attributes.timeForNotification?.slice(0, -4);

        const formattedData = {
          ...res.data.data.attributes,
          id: res.data.data.id,
          timeForNotification: formattedTime,
        };

        commit("UPDATE_NOTES", formattedData);
      });
  },

  //удалить заметку
  deleteNote({ commit }, note) {
    return axios
      .delete(`http://localhost:1337/api/notes/${note.id}`)
      .then((res) => {
        const formattedData = {
          id: res.data.data.id,
          ...res.data.data.attributes,
        };

        commit("DELETE_NOTE", formattedData);
      });
  },

  //добавить новую заметку
  addNewNote({ commit }, note) {
    return axios
      .post(
        "http://localhost:1337/api/notes/",
        {
          data: {
            title: note.title,
            description: note.description,
            author: note.author,
            importance: note.importance,
            isEveryDayNotification: note.isEveryDayNotification,
            timeForNotification: note.timeForNotification,
          },
        },
        {
          headers: { "Content-type": "application/json" },
        }
      )
      .then((res) => {
        const formattedTime =
          res.data.data.attributes.timeForNotification?.slice(0, -4);

        const formattedData = {
          ...res.data.data.attributes,
          id: res.data.data.id,
          timeForNotification: formattedTime,
        };

        commit("ADD_NEW_NOTE", formattedData);
      });
  },

  clearCurrentNote({ commit }) {
    commit("CLEAR_CURRENT_NOTE");
  },
};
