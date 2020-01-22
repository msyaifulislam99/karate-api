'use strict';

const { validateAll } = use('Validator');
const { isEmpty } = use('lodash');
const User = use('App/Models/User');
const UserTransformer = use('App/Transformers/UserTransformer');
const messages = use('App/Library/Validator/Messages');
const Constants = use('App/Library/Helpers/Constants');
const Hash = use('Hash');
const uuid = use('uuid');
const moment = use('moment');

class AuthController {
  async Login({ request, response, auth }) {
    const rules = {
      username: 'required',
      password: 'required'
    };
    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const { username, password } = request.all();
    const user = await User.findByOrFail('username', username);

    if (!user.isVerified()) {
      return response.errorUnauthorized('Verify your account by following instruction we sent to your email');
    }

    if (!user.isActive()) {
      return response.errorUnauthorized('Your account has been blocked by system');
    }

    if (await auth.attempt(username, password)) {
      const token = await auth.generate(user);
      return response.ok({ ...token });
    }

    return response.errorBadRequest('Username or Password is incorrect');
  }

  async Register({ request, response, transform }) {
    const rules = {
      username: 'required|string|unique:users,username',
      password: 'required|min:6',
      email: 'required|email',
      name: 'required|max:100',
      gender: 'required',
      birthday: 'required|dateFormat:YYYY-MM-DD',
      phone: 'required|phone|unique:users,phone',
      address: 'required',
      city_id: 'required',
      province_id: 'required'
    };
    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const payload = request.only([
      'username',
      'email',
      'name',
      'gender',
      'birthday',
      'phone',
      'address',
      'address2',
      'province_id',
      'city_id',
      'zip_code'
    ]);

    payload.password = await Hash.make(request.input('password'));
    payload.status = Constants.USER_STATUS_ACTIVE;
    payload.verification_token = uuid.v4();
    const user = await User.create(payload);

    // Setup User Role
    const role = user.getRole('owner');
    await user.roles().attach([role]);

    return transform.item(user, UserTransformer);
  }

  async Validate({ response, params }) {
    const user = await User.findBy('verification_token', params.id);

    if (user === null || isEmpty(user)) {
      return response.errorNotFound('User Not Found');
    }

    user.verification_token = null;
    user.verified_at = moment();
    user.save();
    return response.noContent();
  }

  async ForgotPassword({ response, request }) {
    const rules = {
      username: 'required|string'
    };
    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const { username } = request.all();
    const user = await User.findBy('username', username);

    if (user === null || isEmpty(user)) {
      return response.errorNotFound('User Not Found');
    }

    user.reset_token = uuid.v4();
    user.save();

    return response.noContent();
  }

  async ChangePassword({ response, request, params }) {
    const rules = {
      password: 'required|confirmed|min:6'
    };
    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const user = await User.findBy('reset_token', params.id);

    if (user === null || isEmpty(user)) {
      return response.errorNotFound('User Not Found');
    }

    const { password } = request.all();
    user.password = await Hash.make(password);
    user.reset_token = null;
    user.save();

    return response.noContent();
  }
}

module.exports = AuthController;
