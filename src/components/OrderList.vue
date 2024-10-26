<template>
  <div class="container mx-auto p-4">
    <OrderFilter
      @searchOrders="handleSearchOrders"
      @searchOrderById="handleSearchOrderById"
      @resetFilters="handleResetFilters"
    />
    <el-skeleton :rows="5" v-if="loading" />
    <OrderTable
      v-else
      :orders="orders"
      @showOrderDetails="handleShowOrderDetails"
    />
    <OrderModal ref="orderModal" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import OrderFilter from './OrderFilter.vue'
import OrderTable from './OrderTable.vue'
import OrderModal from './OrderModal.vue'

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

const orders = ref<Order[]>([])
const orderModal = ref<InstanceType<typeof OrderModal> | null>(null)
const loading = ref(false)
const token = import.meta.env.VITE_APP_API_TOKEN
const fetchOrders = async () => {
  loading.value = true
  try {
    const response = await axios.get(
      'https://msk.ivanor.ru/front/service/test-api/v1/orders',
      {
        headers: { Token: '083ac5b04de46374bdadde93abe8e699' },
      },
    )
    console.log('API Response:', response.data)
    orders.value = response.data.orders
    console.log('Orders in List:', orders.value)
  } catch (error) {
    console.error('API Error:', error)
  } finally {
    loading.value = false
  }
}

const handleSearchOrders = async (params: {
  dateFrom: string
  dateTo: string
  orderStatus: string
}) => {
  loading.value = true
  try {
    const response = await axios.get(
      'https://msk.ivanor.ru/front/service/test-api/v1/orders',
      {
        headers: { Token: `${token}` },
        params,
      },
    )
    orders.value = response.data.orders
    console.log('Searched Orders:', orders.value)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const handleSearchOrderById = async (orderId: string) => {
  loading.value = true
  try {
    const response = await axios.get(
      `https://msk.ivanor.ru/front/service/test-api/v1/order/${orderId}`,
      {
        headers: { Token: `${token}` },
      },
    )
    if (response.data.order) {
      orderModal.value?.openModal(response.data.order)
    } else {
      orderModal.value?.openModal(null, 'Заказ не найден')
    }
  } catch (error) {
    console.error(error)
    orderModal.value?.openModal(null, 'Произошла ошибка при поиске заказа')
  } finally {
    loading.value = false
  }
}

const handleShowOrderDetails = async (row: Order) => {
  loading.value = true
  try {
    const response = await axios.get(
      `https://msk.ivanor.ru/front/service/test-api/v1/order/${row.id}`,
      {
        headers: { Token: `${token}` },
      },
    )
    orderModal.value?.openModal(response.data.order)
  } catch (error) {
    console.error(error)
    orderModal.value?.openModal(
      null,
      'Произошла ошибка при загрузке деталей заказа',
    )
  } finally {
    loading.value = false
  }
}

const handleResetFilters = () => {
  fetchOrders()
}

onMounted(() => {
  fetchOrders()
})
</script>
