<template>
  <div class="container">
    <button type="button" @click="openAddNewNoteModal" class="button">
      Создать новую заметку
    </button>
    <section class="section">
      <ul class="notesList">
        <li v-for="note in $store.state.notes" class="noteItem">
          <div></div>
          <h2>Заметка: {{ note.title }}</h2>
          <p>Автор: {{ note.author }}</p>
          <p>Описание: {{ note.description }}</p>
          <p>Важность: {{ note.importance }}</p>
          <p v-if="note.isEveryDayNotification === true">
            Уведомления отправляются каждый день в
            <span>{{ note.timeForNotification.slice(0, -3) }}</span>
          </p>
          <button type="button" @click="openEditModal(note)" class="button">
            Редактировать
          </button>
          <button type="button" @click="openAlertModal(note)" class="button">
            Удалить
          </button>
        </li>
      </ul>
      <Modal
        v-if="mode.add || mode.edit"
        @closeModal="closeModal"
        :mode="mode"
      />
      <AlertModal v-if="mode.alert" @closeModal="closeModal" :mode="mode" />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: {
        edit: false,
        add: false,
        alert: false,
      },
    };
  },
  methods: {
    closeModal() {
      this.mode.add = false;
      this.mode.edit = false;
      this.mode.alert = false;
      this.$store.dispatch("clearCurrentNote");
    },
    openEditModal(note) {
      this.mode.edit = true;
      this.$store.dispatch("setCurrentNote", note);
    },
    openAlertModal(note) {
      this.mode.alert = true;
      this.$store.dispatch("setCurrentNote", note);
    },
    openAddNewNoteModal() {
      this.mode.add = true;
    },
  },
};
</script>

<style scoped>
.button {
  width: 200px;
  margin-top: 15px;
  padding: 10px 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background: white;
  color: black;
  transition: 0.3s;
  cursor: pointer;
}
.button:hover {
  color: white;
  background: black;
  transition: 0.3s;
}

.notesList {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.noteItem {
  width: 250px;
  height: 350px;
  margin: 30px;
  background: white;
  border-radius: 10px;
  border: 1px solid grey;
  padding: 15px;
  box-sizing: border-box;
}

.section {
  max-width: 900px;
  margin: auto;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
