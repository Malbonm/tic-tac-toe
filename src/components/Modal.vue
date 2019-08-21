<template functional>
  <div class="modal">
    <div class="modal__content">
        <h2 v-if="props.name">{{props.name}} ha ganado!</h2>
        <h2 v-else>Draw!</h2>
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
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
    width: 95%;
    height: 200px;
    max-height: 400px;
    background: #ECEFF1;
    display: grid;
    align-items: center;
    @media only screen and (min-width: 400px) {
      width: 350px;
    }
  }
}
</style>
