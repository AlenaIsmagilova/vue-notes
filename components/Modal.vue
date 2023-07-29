<template>
  <article class="modal-wrap">
    <div class="container">
      <span class="icon-close" @click="$emit('closeModal')"></span>
      <h1 v-if="mode.edit">Редактирование заметки</h1>
      <h1 v-if="mode.add">Создание заметки</h1>
      <form>
        <label class="label">
          Название заметки
          <input
            id="titleInput"
            :class="[!currentNote.title && submitted ? inValid : valid]"
            type="text"
            v-model="currentNote.title"
          />
        </label>
        <p v-if="!currentNote.title && submitted" class="invalidMessage">
          {{ titleError }}
        </p>
        <label class="label">
          Содержание заметки
          <input class="input" type="text" v-model="currentNote.description" />
        </label>
        <label class="label">
          Автор заметки
          <input
            id="authorInput"
            :class="[!currentNote.author && submitted ? inValid : valid]"
            type="text"
            v-model="currentNote.author"
          />
        </label>
        <p v-if="!currentNote.author && submitted" class="invalidMessage">
          {{ authorError }}
        </p>
        <label class="label">
          Важность заметки:
          <select class="input" v-model="currentNote.importance">
            <option value="default" v-if="mode.add" disabled>
              --Пожалуйста,выберите значение--
            </option>
            <option value="very">Очень важная</option>
            <option value="ordinary">Обычная</option>
            <option value="less">Неважная</option>
          </select>
        </label>
        <label class="label labelIsEveryDayNotification">
          <input
            class="input"
            type="checkbox"
            name="notification"
            value="true"
            v-model="currentNote.isEveryDayNotification"
          />
          Отправлять уведомление каждый день</label
        >
        <label class="label" v-if="currentNote.isEveryDayNotification === true">
          Выберите время для отправки уведомлений:
          <vue-timepicker
            v-if="currentNote.isEveryDayNotification === true"
            format="HH:mm:ss"
            :minute-interval="15"
            v-model="currentNote.timeForNotification"
            @change="onChange($event)"
            manual-input
            hide-dropdown
            close-on-complete
          ></vue-timepicker>
        </label>
        <button type="submit" class="button" @click.prevent="handleSubmit">
          Сохранить
        </button>
        <button
          type="button"
          class="button"
          @click.prevent="$emit('closeModal')"
        >
          Отмена
        </button>
      </form>
    </div>
  </article>
</template>

<script>
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import { Note } from "~/types/Note";

export default {
  components: {
    VueTimepicker,
  },
  data() {
    return {
      currentNote: this.mode.add
        ? new Note()
        : { ...this.$store.state.currentNote },
      titleError: "Требуется указать название заметки",
      authorError: "Требуется указать автора заметки",
      submitted: false,
      inValid: "invalidInput",
      valid: "input",
    };
  },
  props: {
    mode: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    onChange(eventData) {
      this.currentNote.timeForNotification = eventData.displayTime;
    },

    checkForm() {
      if (this.currentNote.title && this.currentNote.author) {
        this.$emit("closeModal");
      }
    },

    handleSubmit() {
      if (this.mode.edit) {
        this.submitted = true;
        this.$store.dispatch("updateNote", this.currentNote);
        this.checkForm();
      } else {
        this.submitted = true;
        this.$store.dispatch("addNewNote", this.currentNote);
        this.checkForm();
      }
    },
  },
};
</script>

<style scoped>
.modal-wrap {
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
}

.container {
  width: 400px;
  min-height: 575px;
  padding: 30px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border-radius: 14px;
  cursor: pointer;
}
.icon-close {
  width: 20px;
  height: 20px;
  position: absolute;
  right: -25px;
  top: -25px;
}
.icon-close::after {
  width: 100%;
  display: inline-block;
  content: "";
  border: 1px solid white;
  transform: rotate(45deg);
  position: absolute;
  top: 50%;
  left: 0;
}
.icon-close::before {
  width: 100%;
  display: inline-block;
  content: "";
  border: 1px solid white;
  transform: rotate(-45deg);
  position: absolute;
  top: 50%;
  left: 0;
}

.label {
  display: flex;
  flex-direction: column;
  margin: 12px 0 0;
}

.input {
  padding: 5px 15px;
  outline: none;
}

.invalidInput {
  border-color: red;
  padding: 5px 15px;
  outline: none;
}

.invalidMessage {
  margin: 0;
  color: red;
}

.button {
  width: 100%;
  margin-top: 35px;
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

.labelIsEveryDayNotification {
  flex-direction: row-reverse;
  justify-content: flex-end;
}
</style>
