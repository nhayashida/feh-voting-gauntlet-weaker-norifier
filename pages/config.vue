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
import { computed, createComponent, onMounted } from '@vue/composition-api';

export default createComponent({
  setup(props, { root }) {
    onMounted(() => {
      root.$store.dispatch('profile/fetchProfile');
    });

    const onChange = (e) => {
      const { id, value } = e.target;
      root.$store.dispatch('profile/setSettings', { [id]: value });
    };

    return {
      settings: computed(() => root.$store.state.profile.settings),
      heroes: computed(() => root.$store.state.profile.heroes),
      channels: computed(() => root.$store.state.profile.channels),
      onChange,
    };
  },
});
</script>

<style>
.container {
  margin: 32px;
}
</style>
