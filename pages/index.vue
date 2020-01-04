<template>
  <div class="container">
    <b-loading :is-full-page="true" :active.sync="isLoading" />
    <div v-if="isLoggedIn">
      <b-field>
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
    </div>
    <login />
  </div>
</template>

<script>
import { createComponent, onMounted, computed, watch } from '@vue/composition-api';
import Login from '@/components/Login';

export default createComponent({
  components: {
    Login,
  },
  setup(props, { root }) {
    const isLoading = computed(() => root.$store.state.profile.loading);
    const isLoggedIn = computed(() => liff.isLoggedIn());

    watch(isLoggedIn, async (to) => {
      if (to) {
        const { userId } = await liff.getProfile();
        root.$store.dispatch('profile/setSettings', { userId });
      }
    });

    onMounted(() => {
      root.$store.dispatch('profile/fetchProfile');
    });

    const onChange = (e) => {
      const { id, value } = e.target;
      root.$store.dispatch('profile/setSettings', { [id]: value });
    };

    return {
      isLoading,
      isLoggedIn,
      settings: computed(() => root.$store.state.profile.settings),
      heroes: computed(() => root.$store.state.profile.heroes),
      onChange,
    };
  },
});
</script>

<style scoped lang="scss">
.container {
  margin: 16px;

  & > div {
    margin-bottom: 32px;
  }
}
</style>
