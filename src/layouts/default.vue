<script setup lang="ts"></script>

<template>
  <div class="f-wrapper">
    <header class="l-header">
      <div class="l-header-container l-container">
        <div class="c-header-title">TITLE</div>
      </div>
    </header>
    <main id="main" class="l-main l-container">
      <slot />
    </main>
  </div>
</template>

<style>
  .f-wrapper {
    height: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    width: 100%;
    background-color: whitesmoke;
    font-size: 1rem;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    line-height: 1.25rem;
    color: dimgrey;
  }
  .l-header {
    width: 100vw;
    width: 100dvw;
    height: 4rem;
    background-color: dimgrey;
    overflow: hidden;
  }
  .l-header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: auto;
    margin-right: auto;
  }
  .l-main {
    display: flex;
    position: relative;
    height: calc(100vh - 4rem);
    height: calc(100dvh - 4rem);
    padding: 0.5rem;
    margin: auto;
  }
  .c-header-title {
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 700;
    color: whitesmoke;
  }

  .l-container {
    width: 100vw;
    width: 100dvw;
    max-width: 100vw;
    max-width: 100dvw;
  }
  @media screen and (min-width: 1280px) {
    .l-container {
      max-width: 1280px;
    }
  }
  @media screen and (min-width: 1536px) {
    .l-container {
      max-width: 1536px;
    }
  }
</style>
