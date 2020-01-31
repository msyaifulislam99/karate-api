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

    const judge_1 = new User();
    judge_1.name = 'judge_1';
    judge_1.username = 'judge_1';
    judge_1.email = 'admin@admin.com.mx';
    judge_1.password = await Hash.make('123');
    judge_1.phone = '+6285964042311';
    judge_1.gender = 'male';
    judge_1.birthday = '2010-10-10';
    judge_1.status = 'active';
    judge_1.verified_at = moment();
    await judge_1.save();

    await judge_1.roles().attach([roleOwner.id]);

    const judge_2 = new User();
    judge_2.name = 'judge_2';
    judge_2.username = 'judge_2';
    judge_2.email = 'admin@admin.com.mx';
    judge_2.password = await Hash.make('123');
    judge_2.phone = '+6285964042311';
    judge_2.gender = 'male';
    judge_2.birthday = '2010-10-10';
    judge_2.status = 'active';
    judge_2.verified_at = moment();
    await judge_2.save();

    await judge_2.roles().attach([roleOwner.id]);

    const judge_3 = new User();
    judge_3.name = 'judge_3';
    judge_3.username = 'judge_3';
    judge_3.email = 'admin@admin.com.mx';
    judge_3.password = await Hash.make('123');
    judge_3.phone = '+6285964042311';
    judge_3.gender = 'male';
    judge_3.birthday = '2010-10-10';
    judge_3.status = 'active';
    judge_3.verified_at = moment();
    await judge_3.save();

    await judge_3.roles().attach([roleOwner.id]);

    const judge_4 = new User();
    judge_4.name = 'judge_4';
    judge_4.username = 'judge_4';
    judge_4.email = 'admin@admin.com.mx';
    judge_4.password = await Hash.make('123');
    judge_4.phone = '+6285964042311';
    judge_4.gender = 'male';
    judge_4.birthday = '2010-10-10';
    judge_4.status = 'active';
    judge_4.verified_at = moment();
    await judge_4.save();

    await judge_4.roles().attach([roleOwner.id]);

    const judge_5 = new User();
    judge_5.name = 'judge_5';
    judge_5.username = 'judge_5';
    judge_5.email = 'admin@admin.com.mx';
    judge_5.password = await Hash.make('123');
    judge_5.phone = '+6285964042311';
    judge_5.gender = 'male';
    judge_5.birthday = '2010-10-10';
    judge_5.status = 'active';
    judge_5.verified_at = moment();
    await judge_5.save();

    await judge_5.roles().attach([roleOwner.id]);

    const judge_6 = new User();
    judge_6.name = 'judge_6';
    judge_6.username = 'judge_6';
    judge_6.email = 'admin@admin.com.mx';
    judge_6.password = await Hash.make('123');
    judge_6.phone = '+6285964042311';
    judge_6.gender = 'male';
    judge_6.birthday = '2010-10-10';
    judge_6.status = 'active';
    judge_6.verified_at = moment();
    await judge_6.save();

    await judge_6.roles().attach([roleOwner.id]);

    const judge_7 = new User();
    judge_7.name = 'judge_7';
    judge_7.username = 'judge_7';
    judge_7.email = 'admin@admin.com.mx';
    judge_7.password = await Hash.make('123');
    judge_7.phone = '+6285964042311';
    judge_7.gender = 'male';
    judge_7.birthday = '2010-10-10';
    judge_7.status = 'active';
    judge_7.verified_at = moment();
    await judge_7.save();

    await judge_7.roles().attach([roleOwner.id]);

    const judge_8 = new User();
    judge_8.name = 'judge_8';
    judge_8.username = 'judge_8';
    judge_8.email = 'admin@admin.com.mx';
    judge_8.password = await Hash.make('123');
    judge_8.phone = '+6285964042311';
    judge_8.gender = 'male';
    judge_8.birthday = '2010-10-10';
    judge_8.status = 'active';
    judge_8.verified_at = moment();
    await judge_8.save();

    await judge_8.roles().attach([roleOwner.id]);

    const judge_9 = new User();
    judge_9.name = 'judge_9';
    judge_9.username = 'judge_9';
    judge_9.email = 'admin@admin.com.mx';
    judge_9.password = await Hash.make('123');
    judge_9.phone = '+6285964042311';
    judge_9.gender = 'male';
    judge_9.birthday = '2010-10-10';
    judge_9.status = 'active';
    judge_9.verified_at = moment();
    await judge_9.save();

    await judge_9.roles().attach([roleOwner.id]);

    const judge_10 = new User();
    judge_10.name = 'judge_10';
    judge_10.username = 'judge_10';
    judge_10.email = 'admin@admin.com.mx';
    judge_10.password = await Hash.make('123');
    judge_10.phone = '+6285964042311';
    judge_10.gender = 'male';
    judge_10.birthday = '2010-10-10';
    judge_10.status = 'active';
    judge_10.verified_at = moment();
    await judge_10.save();

    await judge_10.roles().attach([roleOwner.id]);
  }
}

module.exports = UserSeeder;
