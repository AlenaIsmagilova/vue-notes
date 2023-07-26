<template>
  <article class="modal-wrap">
    <div class="container">
      <span class="icon-close" @click="$emit('closeModal')"></span>
      <h1>
        Вы уверены, что хотите удалить заметку "{{ this.currentNote.title }}"?
      </h1>
      <button
        type="button"
        class="button"
        @click.prevent="handleDeleteNoteClick"
      >
        Да, хочу удалить
      </button>
      <button type="button" class="button" @click.prevent="$emit('closeModal')">
        Ой, я передумал
      </button>
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      currentNote: { ...this.$store.state.currentNote },
    };
  },
  props: {
    mode: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    handleDeleteNoteClick() {
      this.$store.dispatch("deleteNote", this.currentNote);
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
</style>
