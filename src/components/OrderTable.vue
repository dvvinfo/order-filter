<template>
  <div class="container-content">
    <h2 class="text-2xl font-bold mb-2">Найдено {{ totalOrders }} заказов</h2>
    <el-skeleton :rows="5" v-if="loading" />
    <div v-else>
      <el-table
        :data="paginatedOrders"
        style="width: 100%"
        @row-click="showOrderDetails"
        class="table-container cursor-pointer"
      >
        <el-table-column prop="id" label="Номер заказа" />
        <el-table-column prop="created" label="Дата-время создания заказа" />
        <el-table-column label="Статус заказа">
          <template #default="{ row }">
            <span :style="{ color: getStatusColor(row.status.id) }">{{
              row.status.title
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="shipment.method.title" label="Тип отгрузки" />
        <el-table-column prop="shipment.date" label="Дата отгрузки" />
        <el-table-column
          prop="payment.method.title"
          label="Способ оплаты"
          show-overflow-tooltip
        />
        <el-table-column
          prop="shop.title"
          label="Место отгрузки"
          show-overflow-tooltip
        />
        <el-table-column label="ФИО клиента" show-overflow-tooltip>
          <template #default="{ row }">
            {{ row.client.firstname }} {{ row.client.lastname }}
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="Сумма заказа" />
        <el-table-column prop="quantity" label="Количество товаров" />
        <el-table-column prop="operator" label="Кто создал заказ" />
      </el-table>
      <el-pagination
        class="mt-5"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalOrders"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, computed } from 'vue'
import { ElTable, ElTableColumn, ElSkeleton, ElPagination } from 'element-plus'

interface Order {
  id: number
  created: string
  status: { id: number; title: string }
  shipment: { method: { title: string }; date: string }
  payment: { method: { title: string } }
  shop: { title: string }
  client: { firstname: string; lastname: string }
  amount: number
  quantity: number
  operator: string
}

const props = defineProps<{ orders: Order[] }>()
const emit = defineEmits(['showOrderDetails'])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)

const totalOrders = computed(() => props.orders.length)

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return props.orders.slice(start, end)
})

const handleCurrentChange = (val: number) => {
  currentPage.value = val
}
const getStatusColor = (statusId: number) => {
  switch (statusId) {
    case 4:
      return 'darkgreen'
    case 6:
      return 'green'
    case 5:
      return 'red'
    default:
      return 'black'
  }
}

const showOrderDetails = (row: Order) => {
  loading.value = true
  emit('showOrderDetails', row)
  loading.value = false
}
</script>

<style scoped>
.table-container {
  overflow: auto;
  width: 1500px;
}
</style>
