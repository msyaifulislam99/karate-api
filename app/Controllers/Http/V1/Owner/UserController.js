'use strict';

const UserTransformer = use('App/Transformers/UserTransformer');
const { validateAll } = use('Validator');
const messages = use('App/Library/Validator/Messages');
const MediaTransformer = use('App/Transformers/MediaTransformer');
const { isEmpty } = use('lodash');
const Hash = use('Hash');
const Mail = use('Mail');
const Env = use('Env');

class UserController {
  async Show({ auth, transform }) {
    const user = await auth.getUser();
    return transform.item(user, UserTransformer);
  }

  async ChangePassword({ auth, request, response }) {
    const user = await auth.getUser();

    const rules = {
      old_password: 'required|min:6',
      new_password: 'required|confirmed|min:6'
    };
    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    // checking current user input correct old password
    await auth.validate(user.username, request.input('old_password'));

    const password = await Hash.make(request.input('new_password'));
    const payload = { password };
    user.merge(payload);
    user.save();

    await Mail.send('mails.changed-password', { name: user.name }, message => {
      message
        .to(user.email)
        .from(Env.get('APP_MAIL', false))
        .subject('Changed password');
    });

    return response.noContent();
  }

  async Update({ auth, transform, request, response }) {
    const user = await auth.getUser();

    let rules = {
      name: 'max:100',
      birthday: 'dateFormat:YYYY-MM-DD'
    };
    let validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const payload = request.only([
      'name',
      'email',
      'gender',
      'birthday',
      'phone',
      'address',
      'address2',
      'province_id',
      'city_id',
      'zip_code',
      'code'
    ]);

    // if phone changed
    if (!isEmpty(request.input('phone')) && request.input('phone') !== user.phone) {
      rules = {
        phone: 'required|phone|unique:users,phone'
      };
      validation = await validateAll(request.all(), rules, messages);
      if (validation.fails()) {
        return response.errorInvalid(validation);
      }

      Object.assign(payload, { phone: request.input('phone') });
    }

    // if username changed
    if (!isEmpty(request.input('username')) && request.input('username') !== user.username) {
      rules = {
        username: 'required|string|unique:users,username'
      };
      validation = await validateAll(request.all(), rules, messages);
      if (validation.fails()) {
        return response.errorInvalid(validation);
      }
      Object.assign(payload, { username: request.input('username') });
    }

    // if email changed
    if (!isEmpty(request.input('email')) && request.input('email') !== user.email) {
      rules = {
        email: 'required|string|email'
      };
      validation = await validateAll(request.all(), rules, messages);
      if (validation.fails()) {
        return response.errorInvalid(validation);
      }
      Object.assign(payload, { email: request.input('email') });
    }

    // saving updated profile
    user.merge(payload);
    await user.save();

    return transform.item(user, UserTransformer);
  }

  async StoreImage({ request, response, transform, auth }) {
    const user = await auth.getUser();

    try {
      const image = request.file('image', {
        types: ['image'],
        size: '2mb',
        extnames: ['png', 'jpg', 'jpeg']
      });
      // one user one image
      await user.removeMedias();
      const media = await user.saveMedia(image);
      return transform.item(media, MediaTransformer);
    } catch (error) {
      return response.errorBadRequest(error.message);
    }
  }

  async DestroyImage({ response, auth }) {
    const user = await auth.getUser();
    await user.removeMedias();

    return response.noContent();
  }
}

module.exports = UserController;
