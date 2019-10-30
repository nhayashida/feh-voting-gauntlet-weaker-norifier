<template>
  <div class="container">
    <b-field label="Hero">
      <b-select
        id="hero"
        :value="settings.hero"
        placeholder="Select a hero"
        @change.native="onChange"
      >
        <option v-for="hero in heroes" :key="hero.name" :value="hero.name">
          {{ hero.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="Channel">
      <b-select
        id="channel"
        :value="settings.channel"
        placeholder="Select a channel"
        @change.native="onChange"
      >
        <option v-for="channel in channels" :key="channel.id" :value="channel.id">
          {{ channel.name }}
        </option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      settings: 'profile/settings',
      heroes: 'profile/heroes',
      channels: 'profile/channels',
    }),
  },
  mounted() {
    this.$store.dispatch('profile/fetchProfile');
  },
  methods: {
    onChange(e) {
      const { id, value } = e.target;
      this.$store.dispatch('profile/setSettings', { [id]: value });
    },
  },
};
</script>

<style>
.container {
  margin: 32px;
}
</style>
