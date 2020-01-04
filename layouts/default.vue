<template>
  <div>
    <nuxt v-if="isInitialized" />
  </div>
</template>

<script>
import { createComponent, onBeforeMount, computed, ref, watch } from '@vue/composition-api';

export default createComponent({
  setup(props, { root }) {
    const error = computed(() => root.$store.state.profile.error);
    const isInitialized = ref(false);

    watch(error, (to) => {
      if (to) {
        root.$buefy.toast.open({ message: to, type: 'is-danger' });
      }
    });

    onBeforeMount(async () => {
      try {
        await liff.init({
          liffId: process.env.LIFF_ID,
        });
        isInitialized.value = true;
      } catch (err) {
        root.$store.dispatch('profile/setError', err.message);
        console.error(err);
      }
    });

    return {
      isInitialized,
    };
  },
});
</script>
