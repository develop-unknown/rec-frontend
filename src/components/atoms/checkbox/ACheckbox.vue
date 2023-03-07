<script setup lang="ts">
  import type { OptionStatus } from '@/utils/interfaces/input.interface'

  interface CheckboxProps {
    code: number
    name: string
    isChecked: boolean | undefined
  }
  interface CheckboxEmits {
    (event: 'update:isChecked', value: boolean): void
    (event: 'onChange', value: OptionStatus): void
  }

  const props = withDefaults(defineProps<CheckboxProps>(), {
    isChecked: false,
  })
  const emits = defineEmits<CheckboxEmits>()

  const isCheckModel = ref(props.isChecked)

  const onClick = () => {
    isCheckModel.value = !isCheckModel.value
    changeHandler()
  }
  const changeHandler = () => {
    const option: OptionStatus = { code: props.code, isChecked: isCheckModel.value }
    emits('onChange', option)
  }
</script>

<template>
  <label :for="String(props.code)" class="c-checkbox" @click="onClick">
    <input v-model="isCheckModel" type="checkbox" :value="props.code" />
    <span class="c-checkbox-name">{{ props.name }}</span>
  </label>
</template>

<style scoped>
  .c-checkbox {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
  }

  .c-checkbox-name {
    user-select: none;
    margin-left: 0.25rem;
  }
</style>
