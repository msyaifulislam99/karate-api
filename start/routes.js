'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
  return { greeting: 'Welcome, Karate API!' };
});

// unable to do nested group
// Do not call Route.group one inside the another.
// Use the following technique to apply shared properties on a group.
const { Public: AdminPublic, Private: AdminPrivate } = use('App/Routes/V1/Admin');
Route.group(AdminPublic).prefix('v1/admin');
Route.group(AdminPrivate)
  .prefix('v1/admin')
  .middleware(['auth', 'is:administrator']);

const { Public: OwnerPublic, Private: OwnerPivate } = use('App/Routes/V1/Owner');
Route.group(OwnerPublic).prefix('v1/owner');
Route.group(OwnerPivate)
  .prefix('v1/owner')
  .middleware(['auth', 'is:(owner or administrator)']);

const { Public: CustomerPublic, Private: CustomerPrivate } = use('App/Routes/V1/Customer');
Route.group(CustomerPublic).prefix('v1');
Route.group(CustomerPrivate)
  .prefix('v1')
  .middleware(['auth']);

// 404 page not found
Route.any('*', ({ response }) => {
  return response.errorNotFound('Page Not Found');
});
