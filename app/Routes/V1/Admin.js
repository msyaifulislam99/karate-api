'use strict';

const Route = use('Route');

const Private = () => {
  // ================= CATEGORIES =================
  Route.get('categories', 'V1/Admin/CategoryController.Index');
  Route.get('categories/:id', 'V1/Admin/CategoryController.Show');
  Route.post('categories', 'V1/Admin/CategoryController.Store');
  Route.put('categories/:id', 'V1/Admin/CategoryController.Update');
  Route.post('categories/:id/images', 'V1/Admin/CategoryController.StoreImage');
  Route.delete('categories/:id/images', 'V1/Admin/CategoryController.DestroyImage');
  Route.delete('categories/:id', 'V1/Admin/CategoryController.Destroy');

  // ================= RESTAURANTS =================
  Route.get('restaurants', 'V1/Admin/RestaurantController.Index');
  Route.get('restaurants/:id', 'V1/Admin/RestaurantController.Show');
  Route.put('restaurants/:id', 'V1/Admin/RestaurantController.Update');

  // ================= USERS =================
  Route.get('users', 'V1/Admin/UserController.Index');
  Route.get('users/:id', 'V1/Admin/UserController.Show');
  Route.put('users/:id', 'V1/Admin/UserController.Update');
};

const Public = () => {};

module.exports = { Private, Public };
