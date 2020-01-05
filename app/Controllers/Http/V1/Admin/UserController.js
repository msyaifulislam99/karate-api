'use strict';

const User = use('App/Models/User');
const UserTransformer = use('App/Transformers/UserTransformer');
const { validateAll } = use('Validator');
const messages = use('App/Library/Validator/Messages');
const { isEmpty } = use('lodash');
const Query = use('Query');

class UserController {
  async Index({ transform, request, response }) {
    const rules = {
      status: 'required|string',
      role: 'required|string'
    };

    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const query_search = new Query(request, { order: 'name' });
    const order = query_search.order();
    const query = User.query();

    query.where(query_search.search(['name', 'username', 'address', 'address2', 'phone', 'email']));
    query.orderBy(order.column, order.direction);

    if (request.input('status') !== 'all') {
      query.where('status', '=', request.input('status'));
    }

    if (request.input('role') !== 'all') {
      query.whereHas('roles', builder => {
        builder.where('name', '=', request.input('role'));
      });
    }

    const user = await query.paginate(...request.getPage());
    return transform.paginate(user, UserTransformer);
  }

  async Show({ params, transform }) {
    const user = await User.findOrFail(params.id);
    return transform.item(user, UserTransformer);
  }

  async Update({ params, request, response, transform }) {
    let rules = {
      email: 'required|email',
      name: 'required|max:100',
      birthday: 'required|dateFormat:YYYY-MM-DD',
      gender: 'required',
      status: 'required|string'
    };
    let validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const payload = request.only([
      'name',
      'phone',
      'email',
      'birthday',
      'gender',
      'address',
      'address2',
      'city_id',
      'province_id',
      'zip_code',
      'status'
    ]);

    const user = await User.findOrFail(params.id);
    // if phone changed
    if (!isEmpty(request.input('phone')) && request.input('phone') !== user.phone) {
      rules = {
        phone: 'required|phone|unique:users,phone',
        code: 'required|integer'
      };
      validation = await validateAll(request.all(), rules, messages);
      if (validation.fails()) {
        return response.errorInvalid(validation);
      }

      Object.assign(payload, { phone: request.input('phone') });
    }
    user.merge(payload);
    await user.save();

    return transform.item(user, UserTransformer);
  }
}

module.exports = UserController;
