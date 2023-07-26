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
            class="input"
            type="text"
            v-model="currentNote.title"
            @keyup.enter="handleKeyPressed"
          />
        </label>
        <label class="label">
          Содержание заметки
          <input class="input" type="text" v-model="currentNote.description" />
        </label>
        <label class="label">
          Автор заметки
          <input class="input" type="text" v-model="currentNote.author" />
        </label>
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

export default {
  components: {
    VueTimepicker,
  },
  data() {
    return {
      currentNote: this.mode.add
        ? {
            id: 0,
            title: "",
            description: "",
            author: "",
            importance: "default",
            isEveryDayNotification: "",
            timeForNotification: "00:00:00",
          }
        : { ...this.$store.state.currentNote },
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
    handleSubmit() {
      if (this.mode.edit) {
        this.$store.dispatch("updateNote", this.currentNote);
      } else {
        this.$store.dispatch("addNewNote", this.currentNote);
      }
      this.$emit("closeModal");
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
  margin: 15px 0;
}

.input {
  padding: 7px 15px;
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
