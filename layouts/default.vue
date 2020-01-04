<template>
  <div>
    <nuxt v-if="isInitialized" />
  </div>
</template>

<script>
import { createComponent, onBeforeMount, ref } from '@vue/composition-api';

export default createComponent({
  setup() {
    const isInitialized = ref(false);

    onBeforeMount(async () => {
      try {
        await liff.init({
          liffId: process.env.LIFF_ID,
        });
        isInitialized.value = true;
      } catch (err) {
        console.error(err);
      }
    });

    return {
      isInitialized,
    };
  },
});
</script>
