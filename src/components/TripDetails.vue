<script lang="ts" setup>
import { useMapStore } from '../composables'

const { distance, duration } = useMapStore()
</script>

<template>
  <div
    v-if="distance !== undefined && duration !== undefined"
    class="bg-white rounded-xl fixed flex flex-col left-[20px] p-5 shadow-2xl bottom-[50px] text-[20px]"
  >
    <div>
      Distancia: <strong class="text-[#339FB3]">{{ distance }} kms</strong>
    </div>
    <div>
      Duración: <strong class="text-[#339FB3]">{{ duration }} minutos</strong>
    </div>
  </div>
</template>
