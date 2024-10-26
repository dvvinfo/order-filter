<template>
  <div class="mb-4">
    <h2 class="text-2xl font-bold mb-2">Фильтр заказов</h2>
    <div class="flex justify-between gap-3">
      <div class="w-1/3">
        <label class="">Номер заказа:</label>
        <div class="mb-2">
          <el-input v-model="orderId" placeholder="Номер заказа" class="mt-2" />
          <div class="flex justify-end">
            <el-button class="mt-2" type="primary" @click="searchOrderById"
              >Искать</el-button
            >
          </div>
        </div>
      </div>
      <div class="mb-2 flex gap-3 w-2/3 full">
        <div class="w-2/3">
          <label class="">Дата заказа:</label>
          <div class="flex gap-3 mt-2 w-full justify-end">
            <el-date-picker
              v-model="dateFrom"
              type="date"
              placeholder="Начало периода"
              class="w-full"
            />
            <el-date-picker
              v-model="dateTo"
              type="date"
              placeholder="Конец периода"
              class="w-full"
            />
          </div>
        </div>
        <div class="w-1/3">
          <label class="">Статус заказа:</label>
          <el-select
            v-model="selectedStatuses"
            multiple
            placeholder="Выберите статусы"
            class="w-full mt-2"
          >
            <el-option
              v-for="status in statusOptions"
              :key="status.id"
              :label="status.title"
              :value="status.id"
            />
          </el-select>
          <div class="flex justify-end">
            <el-button class="mt-2 ml-auto" type="primary" @click="searchOrders"
              >Искать</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <el-button class="mt-2" type="danger" @click="resetFilters"
        >Сбросить фильтры</el-button
      >
    </div>
    <el-skeleton :rows="5" v-if="loading" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const orderId = ref('')
const dateFrom = ref<Date | null>(null)
const dateTo = ref<Date | null>(null)
const selectedStatuses = ref<number[]>([])
const loading = ref(false)

const statusOptions = [
  { id: 1, title: 'Заказ обрабатывается' },
  { id: 2, title: 'Заказ обработан' },
  { id: 3, title: 'Не хватило товара для резервирования' },
  { id: 4, title: 'Заказ выполнен' },
  { id: 5, title: 'Заказ отменен' },
  { id: 6, title: 'Заказ зарезервирован' },
]

const searchOrderById = () => {
  loading.value = true
  emit('searchOrderById', orderId.value)
  loading.value = false
}

const searchOrders = () => {
  loading.value = true
  emit('searchOrders', {
    dateFrom: dateFrom.value ? dateFrom.value.toISOString().split('T')[0] : '',
    dateTo: dateTo.value ? dateTo.value.toISOString().split('T')[0] : '',
    orderStatus: selectedStatuses.value.join(','),
  })
  loading.value = false
}

const resetFilters = () => {
  orderId.value = ''
  dateFrom.value = null
  dateTo.value = null
  selectedStatuses.value = []
  emit('resetFilters')
}

const emit = defineEmits(['searchOrders', 'searchOrderById', 'resetFilters'])
</script>

<style scoped>
.full:deep(.el-date-editor.el-input) {
  width: 100% !important;
}
</style>
