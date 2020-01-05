'use strict';

const Route = use('Route');

const Private = () => {
  // ================= PROFILE =================
  Route.get('me', 'V1/Customer/UserController.Show');
  Route.put('me', 'V1/Customer/UserController.UpdateProfile');
  Route.put('me/phone', 'V1/Customer/UserController.UpdatePhone');
  Route.post('me/otp', 'V1/Customer/UserController.UpdateOTP');
  Route.post('me/images', 'V1/Customer/UserController.StoreImage');
  Route.delete('me/images', 'V1/Customer/UserController.DestroyImage');

  // ================= TABLE =================
  Route.get('tables/:code', 'V1/Customer/TableController.Show');
  Route.get('tables/:code/sessions', 'V1/Customer/TableController.IndexSession');
  Route.post('tables/:code/sessions', 'V1/Customer/TableController.StoreSession');

  // ================= SESSION =================
  Route.get('sessions/summary', 'V1/Customer/SessionController.ShowSummary');
  Route.post('sessions/actions', 'V1/Customer/SessionController.StoreAction');
  Route.get('sessions/:id/check', 'V1/Customer/SessionController.ShowCheck');
  Route.post('sessions/:id/join', 'V1/Customer/SessionController.StoreJoin');

  // ================= MEMBER =================
  Route.get('members', 'V1/Customer/MemberController.Index');
  Route.get('members/:id', 'V1/Customer/MemberController.Show');
  Route.post('members/:id/actions', 'V1/Customer/MemberController.StoreAction');

  // ================= CART =================
  Route.get('cart-items', 'V1/Customer/CartController.Index');
  Route.get('cart-items/:id', 'V1/Customer/CartController.Show');
  Route.post('cart-items', 'V1/Customer/CartController.Store');
  Route.put('cart-items/:id', 'V1/Customer/CartController.Update');
  Route.delete('cart-items/:id', 'V1/Customer/CartController.Destroy');

  // ================= ORDER =================
  Route.get('orders/me', 'V1/Customer/OrderController.ShowMe');
  Route.get('orders/summary', 'V1/Customer/OrderController.ShowSummary');
  Route.post('orders/place', 'V1/Customer/OrderController.StorePlace');
  Route.post('orders/pay', 'V1/Customer/OrderController.StorePay');

  // ================= ORDER ITEM =================
  Route.get('orders/:orderId/order-items/:id', 'V1/Customer/OrderItemController.Show');
  Route.put('orders/:orderId/order-items/:id', 'V1/Customer/OrderItemController.Update');
  Route.post('orders/:orderId/order-items/:id/actions', 'V1/Customer/OrderItemController.StoreAction');

  // ================= PAYMENT =================
  Route.get('payments/summary', 'V1/Customer/PaymentController.ShowSummary');
  Route.post('payments/retry', 'V1/Customer/PaymentController.StoreRetry');

  // ================= SEARCH =================
  Route.get('search/recent', 'V1/Customer/SearchController.Index');
};

const Public = () => {
  // ================= AREA =================
  Route.get('provinces', 'V1/Customer/AreaController.IndexProvinces');
  Route.get('provinces/:id/cities', 'V1/Customer/AreaController.IndexCities');

  // ================= AUTHORIZATION =================
  Route.post('login/otp/request', 'V1/Customer/AuthController.LoginOTP');
  Route.post('login', 'V1/Customer/AuthController.Login');

  Route.post('register/otp/request', 'V1/Customer/AuthController.RegisterOTP');
  Route.post('register/otp/verify', 'V1/Customer/AuthController.RegisterVerify');
  Route.post('register', 'V1/Customer/AuthController.Register');

  Route.get('social/callback/:provider', 'V1/Customer/AuthController.SocialCallback');
  Route.get('social/:provider', 'V1/Customer/AuthController.Social');

  // ================= SEARCH =================
  Route.post('search', 'V1/Customer/SearchController.Search');
  Route.get('autocomplete', 'V1/Customer/SearchController.Autocomplete');
  Route.get('code/:code/check', 'V1/Customer/SearchController.CheckCode');

  // ===================== RESTAURANT ================
  Route.get('restaurants/nearby', 'V1/Customer/RestaurantController.IndexNearby');
  Route.get('restaurants/popular', 'V1/Customer/RestaurantController.IndexPopular');
  Route.get('restaurants/:slug', 'V1/Customer/RestaurantController.Show');

  // ===================== CATEGORY ================
  Route.get('categories', 'V1/Customer/CategoryController.Index');
  Route.get('categories/:slug/restaurants', 'V1/Customer/CategoryController.IndexRestaurants');
  Route.get('categories/:slug', 'V1/Customer/CategoryController.Show');

  // ================= PAYMENT =================
  Route.post('payments/notification', 'V1/Customer/PaymentController.StoreNotification');
};

module.exports = { Private, Public };
