<template>
  <NotesList />
</template>

<script lang="ts">
import Vue from "vue";
import NotesList from "~/components/NotesList.vue";

export default Vue.extend({
  name: "IndexPage",
  components: { NotesList },
});
</script>
