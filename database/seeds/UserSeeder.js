'use strict';

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User');
const Role = use('Role');
const Hash = use('Hash');
const moment = use('moment');

class UserSeeder {
  async run() {
    const roleAdmin = new Role();
    roleAdmin.name = 'Administrator';
    roleAdmin.slug = 'administrator';
    roleAdmin.description = 'manage administration privileges';
    await roleAdmin.save();

    const roleOwner = new Role();
    roleOwner.name = 'Judge';
    roleOwner.slug = 'judge';
    roleOwner.description = 'manage administration privileges for owner store';
    await roleOwner.save();

    const roleCustomer = new Role();
    roleCustomer.name = 'Contingent';
    roleCustomer.slug = 'contingent';
    roleCustomer.description = 'user standard role';
    await roleCustomer.save();

    const user = new User();
    user.name = 'Syaiful';
    user.username = 'admin';
    user.email = 'admin@admin.com.mx';
    user.password = await Hash.make('admin12345');
    user.phone = '+6285964042311';
    user.gender = 'male';
    user.birthday = '2010-10-10';
    user.status = 'active';
    user.verified_at = moment();
    await user.save();

    await user.roles().attach([roleAdmin.id]);
  }
}

module.exports = UserSeeder;
