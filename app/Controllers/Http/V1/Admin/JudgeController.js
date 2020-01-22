'use strict';

const { validateAll } = use('Validator');
const messages = use('App/Library/Validator/Messages');
const Query = use('Query');
const Judge = use('App/Models/Judge');
const JudgeTransformer = use('App/Transformers/JudgeTransformer');
const MediaTransformer = use('App/Transformers/MediaTransformer');

class JudgeController {
  async Index({ transform, request }) {
    const query_search = new Query(request, { order: 'name' });
    const order = query_search.order();
    const query = Judge.query();

    query.where(query_search.search(['name']));
    query.orderBy(order.column, order.direction);

    const restaurants = await query.paginate(...request.getPage());
    return transform.paginate(restaurants, JudgeTransformer);
  }

  async Store({ transform, request, response }) {
    const rules = {
      name: 'required|string',
      birthday: 'date'
    };

    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const payload = request.only(['name', 'gender', 'birthday', 'country']);

    const restaurant = await Judge.create({ ...payload });

    return transform.item(restaurant, JudgeTransformer);
  }

  async Update({ params, request, response, transform }) {
    const rules = {
      name: 'required|string',
      birthday: 'date'
    };
    const validation = await validateAll(request.all(), rules, messages);
    if (validation.fails()) {
      return response.errorInvalid(validation);
    }

    const payload = request.only(['name', 'gender', 'birthday', 'country']);

    const judge = await Judge.findOrFail(params.id);
    judge.merge(payload);
    await judge.save();

    return transform.item(judge, JudgeTransformer);
  }

  async Destroy({ response, params }) {
    const judge = await Judge.findOrFail(params.id);
    await judge.delete();

    return response.noContent();
  }

  async StoreImage({ params, request, response, transform }) {
    const judge = await Judge.findOrFail(params.id);

    try {
      const image = request.file('image', {
        types: ['image'],
        size: '2mb',
        extnames: ['png', 'jpg', 'jpeg']
      });
      // one judge one image
      await judge.removeMedias();
      const media = await judge.saveMedia(image);
      return transform.item(media, MediaTransformer);
    } catch (error) {
      return response.errorBadRequest(error.message);
    }
  }

  async DestroyImage({ params, response }) {
    const restaurant = await Judge.findOrFail(params.id);
    await restaurant.removeMedias();

    return response.noContent();
  }
}

module.exports = JudgeController;
