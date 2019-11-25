import axios from "axios";
import { isEmpty } from "../utils/validate";
import {
  _OPENCART_ENDPOINT,
  _OPENCART_SHOP_SECRET_KEY,
  _OPENCART_ADMIN_SECRET_KEY
} from "../utils/config";

export const addCustomers = () => {};

export const checkCustomer = () => {};

export const fetchCatagory = () => {
  return axios.get(`${_OPENCART_ENDPOINT}index.php?route=rest/category_admin/category`, {
    headers: { "X-Oc-Restadmin-Id": _OPENCART_ADMIN_SECRET_KEY }
  });
};

export const fetchProducts = category_id => {
  return axios.get(
    `${_OPENCART_ENDPOINT}index.php?route=rest/product_admin/products&category=${category_id}`,
    {
      headers: { "X-Oc-Restadmin-Id": _OPENCART_ADMIN_SECRET_KEY }
    }
  );
};

export const fetchProductDetail = product_id => {
  return axios.get(
    `${_OPENCART_ENDPOINT}index.php?route=rest/product_admin/products&id=${product_id}`,
    {
      headers: { "X-Oc-Restadmin-Id": _OPENCART_ADMIN_SECRET_KEY }
    }
  );
};

export const fetchPromotionProducts = () => {
  return axios.get(
    `${_OPENCART_ENDPOINT}index.php`,
    { route: "feed/rest_api/specials" },
    {
      headers: { "X-Oc-Merchant-Id": _OPENCART_SHOP_SECRET_KEY }
    }
  );
};
