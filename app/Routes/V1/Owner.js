'use strict';

const Route = use('Route');

const Private = () => {
  // ================= PROFILE =================
  Route.get('me', 'V1/Owner/UserController.Show');
  Route.put('me', 'V1/Owner/UserController.Update');
  Route.put('me/password', 'V1/Owner/UserController.ChangePassword');
  Route.post('me/images', 'V1/Owner/UserController.StoreImage');
  Route.delete('me/images', 'V1/Owner/UserController.DestroyImage');

  // ================= RESTAURANT =================
  Route.get('restaurants', 'V1/Owner/RestaurantController.Index');
  Route.get('restaurants/:id', 'V1/Owner/RestaurantController.Show');
  Route.post('restaurants', 'V1/Owner/RestaurantController.Store');
  Route.put('restaurants/:id', 'V1/Owner/RestaurantController.Update');
  Route.delete('restaurants/:id', 'V1/Owner/RestaurantController.Destroy');

  Route.post('restaurants/:id/images', 'V1/Owner/RestaurantController.StoreImage');
  Route.delete('restaurants/:id/images', 'V1/Owner/RestaurantController.DeleteImage');

  // ================= MENU =================
  Route.get('restaurants/:restoId/menus', 'V1/Owner/MenuController.Index');
  Route.get('restaurants/:restoId/menus/:id', 'V1/Owner/MenuController.Show');
  Route.post('restaurants/:restoId/menus', 'V1/Owner/MenuController.Store');
  Route.put('restaurants/:restoId/menus/:id', 'V1/Owner/MenuController.Update');
  Route.delete('restaurants/:restoId/menus/:id', 'V1/Owner/MenuController.Destroy');

  Route.post('restaurants/:restoId/menus/:id/images', 'V1/Owner/MenuController.StoreImage');
  Route.delete('restaurants/:restoId/menus/:id/images', 'V1/Owner/MenuController.DestroyImage');

  // ================= MENU TYPE =================
  Route.get('restaurants/:restoId/types', 'V1/Owner/TypeController.Index');
  Route.get('restaurants/:restoId/types/:id', 'V1/Owner/TypeController.Show');
  Route.post('restaurants/:restoId/types', 'V1/Owner/TypeController.Store');
  Route.put('restaurants/:restoId/types/:id', 'V1/Owner/TypeController.Update');
  Route.delete('restaurants/:restoId/types/:id', 'V1/Owner/TypeController.Destroy');

  // ================= TABLE =================
  Route.get('restaurants/:restoId/tables', 'V1/Owner/TableController.Index');
  Route.get('restaurants/:restoId/tables/:id', 'V1/Owner/TableController.Show');
  Route.post('restaurants/:restoId/tables', 'V1/Owner/TableController.Store');
  Route.put('restaurants/:restoId/tables/:id', 'V1/Owner/TableController.Update');
  Route.delete('restaurants/:restoId/tables/:id', 'V1/Owner/TableController.Destroy');

  // ================= SESSION =================
  Route.get('restaurants/:restoId/sessions', 'V1/Owner/SessionController.Index');
  Route.post('restaurants/:restoId/sessions/:id/actions', 'V1/Owner/SessionController.StoreAction');

  // ================= ORDER =================
  Route.get('restaurants/:restoId/orders', 'V1/Owner/OrderController.Index');
  Route.get('restaurants/:restoId/orders/:id', 'V1/Owner/OrderController.Show');

  // ================= ORDER ITEM =================
  Route.get('orders/:orderId/order-items/:id', 'V1/Owner/OrderItemController.Show');
  Route.post('orders/:orderId/order-items/:id/actions', 'V1/Owner/OrderItemController.StoreAction');

  // ================= CATEGORIES =================
  Route.get('categories', 'V1/Owner/CategoryController.Index');
};

const Public = () => {
  // ================= AUTHORIZATION =================
  Route.post('login', 'V1/Owner/AuthController.Login');
  Route.post('register', 'V1/Owner/AuthController.Register');
  Route.post('validate/:id', 'V1/Owner/AuthController.Validate');
  Route.post('forgot-password', 'V1/Owner/AuthController.ForgotPassword');
  Route.post('change-password/:id', 'V1/Owner/AuthController.ChangePassword');
};

module.exports = { Private, Public };
