<template>
  <el-dialog v-model="visible" title="Детали заказа" width="50%">
    <div v-if="order">
      <p>Номер заказа: {{ order.id }}</p>
      <p>Дата создания: {{ order.created }}</p>
      <p>Статус: {{ order.status.title }}</p>
      <p>Метод доставки: {{ order.shipment.method.title }}</p>
      <p>Дата доставки: {{ order.shipment.date }}</p>
      <p>Метод оплаты: {{ order.payment.method.title }}</p>
      <p>Магазин: {{ order.shop.title }}</p>
      <p>
        ФИО клиента: {{ order.client.firstname }} {{ order.client.lastname }}
      </p>
      <p>Телефон клиента: {{ order.client.phone }}</p>
      <div class="" v-for="item in order.items" :key="item.id">
        <p>Сумма: {{ item.price }}</p>
        <p>Количество: {{ item.quantity }}</p>
      </div>

      <p>Оператор: {{ order.operator }}</p>
    </div>
    <div v-else>
      <p>{{ errorMessage }}</p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeModal">Закрыть</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElDialog, ElButton } from 'element-plus'

interface Order {
  id: number
  created: string
  status: { id: number; title: string }
  shipment: { method: { title: string }; date: string }
  payment: { method: { title: string } }
  shop: { title: string }
  client: { firstname: string; lastname: string; phone: string }
  amount: number
  quantity: number
  operator: string
  items: { price: number; quantity: number; id: number }[]
  phone: string
}

const visible = ref(false)
const order = ref<Order | null>(null)
const errorMessage = ref('')

const openModal = (orderData: Order | null, message: string = '') => {
  order.value = orderData
  errorMessage.value = message
  visible.value = true
}

const closeModal = () => {
  visible.value = false
  order.value = null
  errorMessage.value = ''
}

defineExpose({ openModal, closeModal })
</script>
