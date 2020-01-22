'use strict';

const Route = use('Route');

const Private = () => {
  // ================= PROFILE =================
  Route.get('me', 'V1/Judge/UserController.Show');
  Route.put('me', 'V1/Judge/UserController.Update');
  Route.put('me/password', 'V1/Judge/UserController.ChangePassword');
  Route.post('me/images', 'V1/Judge/UserController.StoreImage');
  Route.delete('me/images', 'V1/Judge/UserController.DestroyImage');
};

const Public = () => {
  // ================= AUTHORIZATION =================
  Route.post('login', 'V1/Judge/AuthController.Login');
  Route.post('register', 'V1/Judge/AuthController.Register');
  Route.post('validate/:id', 'V1/Judge/AuthController.Validate');
  Route.post('forgot-password', 'V1/Judge/AuthController.ForgotPassword');
  Route.post('change-password/:id', 'V1/Judge/AuthController.ChangePassword');
};

module.exports = { Private, Public };
