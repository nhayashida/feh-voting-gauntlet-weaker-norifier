<template>
  <div class="container">
    <div v-if="isLoggedIn">
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
