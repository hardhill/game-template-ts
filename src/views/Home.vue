<template>
  <div
    :id="containerId"
    v-if="downloaded"
  />
  <div
    class="loader"
    v-else
  >
    Downloading...
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, onUnmounted, ref } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    const downloaded = ref(false);
    const containerId = ref("game-container");
    var instanceGame: Phaser.Game|null = null;
    onMounted(async() => {
      const importGame = await import('../game/index')
      downloaded.value = true
      nextTick(()=>{
        instanceGame = importGame.launcher(containerId.value)
        
      })
    })
    onUnmounted(()=>{
      if(instanceGame!=null){
        instanceGame.destroy(false)
      }
    })
    return { downloaded, containerId };
  },
});
</script>
