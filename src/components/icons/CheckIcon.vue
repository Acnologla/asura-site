<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M5 12l5 5L20 7"
      :stroke="color"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: "CheckIcon",
  props: {
    size: { type: Number, default: 16 },
    color: { type: String, default: "currentColor" },
  },
};
</script>
