interface IOrderStatus {
  id: number
  title: string
}

interface IShipmentMethod {
  id: number
  title: string
}

interface IShipment {
  date: string
  method: IShipmentMethod
}

interface IClient {
  firstname: string
  lastname: string
  phone: string
}

interface IShop {
  id: number
  title: string
}

interface IPaymentMethod {
  id: number
  title: string
}

interface IPaymentStatus {
  id: number
  title: string
}

interface IPayment {
  method: IPaymentMethod
  status: IPaymentStatus
}

interface IOrder {
  id: number
  uid1c: string
  created: string
  status: IOrderStatus
  shipment: IShipment
  payment: IPayment
  shop: IShop
  client: IClient
  amount: number
  quantity: number
  operator: string
}

export type {
  IOrderStatus,
  IShipmentMethod,
  IShipment,
  IClient,
  IShop,
  IPaymentMethod,
  IPaymentStatus,
  IPayment,
  IOrder,
}
