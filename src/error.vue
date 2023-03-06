<script setup lang="ts">
  import type { NuxtApp } from '#app'

  const props = defineProps<{ error: NuxtApp['payload']['error'] }>()
  const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <main class="l-error">
    <div class="l-error-container">
      <p class="c-error-title">ERROR</p>
      <p class="c-error-message">{{ props.error }}</p>
      <div class="l-error-container-button">
        <button @click="handleError">トップページに戻る</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
  .l-error {
    display: flex;
    height: 100vh;
    width: 100vw;
    flex-wrap: wrap;
    background-color: whitesmoke;
  }
  .l-error-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 2rem;
  }
  .l-error-container-button {
    text-align: center;
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  .c-error-title {
    text-align: center;
    font-size: 3.75rem;
    line-height: 1;
  }
  .c-error-message {
    text-align: center;
    font-size: 1.5rem;
    line-height: 2rem;
  }
</style>
