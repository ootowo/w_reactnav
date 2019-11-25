import { createStackNavigator } from "react-navigation";
import React from "react";

import MainProductScreen from "../screens/Product/MainProduct";
import ProductDetailScreen from "../screens/Product/ProductDetail";
import ProductListScreen from "../screens/Product/ProductList";
import CartScreen from "../screens/Product/Cart";
import CheckoutScreen from "../screens/Product/Checkout";
import CheckoutSuccessScreen from "../screens/Product/CheckoutSuccess";
import EditShipAddressScreen from "../screens/Product/EditShipAddress";
import EditInvoiceAddressScreen from "../screens/Product/EditInvoiceAddress";
import PaymentPendingScreen from "../screens/Product/PaymentPending";
import AddressSelectorScreen from "../screens/Product/AddressSelector";
import PickupSelectorScreen from "../screens/Product/PickupSelector";

export default createStackNavigator({
  MainProduct: MainProductScreen,
  ProductList: ProductListScreen,
  ProductDetail: ProductDetailScreen,
  Cart: CartScreen,
  Checkout: CheckoutScreen,
  PaymentPending: PaymentPendingScreen,
  CheckoutSuccess: CheckoutSuccessScreen,
  AddressSelector: AddressSelectorScreen,
  EditShipAddress: EditShipAddressScreen,
  EditInvoiceAddress: EditInvoiceAddressScreen,
  PickupSelector: PickupSelectorScreen
});
