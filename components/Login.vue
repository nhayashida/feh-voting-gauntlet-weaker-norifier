<template>
  <div>
    <b-button v-if="!isLoggedIn" type="is-primary" @click="onLogin"
      >Log in with LINE account</b-button
    >
    <b-button v-else-if="!isInClient" type="is-primary" @click="onLogout">Logout</b-button>
  </div>
</template>

<script>
import { createComponent, computed } from '@vue/composition-api';

export default createComponent({
  setup() {
    const onLogin = () => {
      liff.login();
    };

    const onLogout = () => {
      liff.logout();
      location.reload();
    };

    return {
      isLoggedIn: computed(() => liff.isLoggedIn()),
      isInClient: computed(() => liff.isInClient()),
      onLogin,
      onLogout,
    };
  },
});
</script>
