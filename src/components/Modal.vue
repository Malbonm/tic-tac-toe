<template>
  <div class="modal">
    <div class="modal__content">
        <h2>{{name}} ha ganado!</h2>
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.3);
  z-index: 10;
  &__content {
    min-width: 300px;
    max-width: 600px;
    height: 200px;
    max-height: 400px;
    background: #ECEFF1;
    display: grid;
    align-items: center;
  }
}
</style>
