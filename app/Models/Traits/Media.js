'use strict';

/* eslint func-names: "off" */

const MediaModel = use('App/Models/Media');
const uuid = use('uuid');
const Helpers = use('Helpers');
const fs = use('fs');
const { kebabCase } = use('lodash');
const RequestException = use('App/Exceptions/RequestException');

class Media {
  register(Model, customOptions = {}) {
    const defaultOptions = {};
    // eslint-disable-next-line no-unused-vars
    const options = Object.assign(defaultOptions, customOptions);

    // Add an instance method
    Model.prototype.saveMedia = function(file, drive = 'local') {
      const execute = async () => {
        const type = kebabCase(this.constructor.name);

        // check if dir exists, if not then create
        const path = Helpers.publicPath(`media/${type}`);
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path);
        }

        // move to public dir
        const file_name = `${uuid.v4()}.${file.extname}`;
        await file.move(path, { name: file_name });
        if (!file.moved()) {
          throw new RequestException(file.error().message, 422);
        }

        // save to db
        const media = await MediaModel.create({
          model_type: type,
          model_id: this.id,
          name: file.clientName,
          file_name,
          mime_type: `${file.type}/${file.subtype}`,
          disk: drive,
          size: file.size
        });

        return media;
      };

      return execute();
    };

    Model.prototype.removeMedias = function(id = null) {
      const type = kebabCase(this.constructor.name);
      const remove = async media => {
        const path = Helpers.publicPath(`media/${type}/${media.file_name}`);
        if (fs.existsSync(path)) {
          fs.unlinkSync(path);
        }
        await media.delete();
      };

      const execute = async () => {
        let medias = [];
        if (id) {
          const media = await MediaModel.query()
            .where('model_type', type)
            .where('model_id', this.id)
            .where('id', id)
            .first();

          medias.push(media);
        } else {
          const { rows } = await MediaModel.query()
            .where('model_type', type)
            .where('model_id', this.id)
            .fetch();

          medias = medias.concat(rows || []);
        }

        // delete db and file
        medias.forEach(media => remove(media));

        return true;
      };

      return execute();
    };

    Model.prototype.getMedias = function() {
      const type = kebabCase(this.constructor.name);
      return MediaModel.query()
        .where('model_type', type)
        .where('model_id', this.id)
        .fetch();
    };

    Model.prototype.getMedia = function() {
      const type = kebabCase(this.constructor.name);
      return MediaModel.query()
        .where('model_type', type)
        .where('model_id', this.id)
        .first();
    };

    Model.prototype.getMediaByID = function(id) {
      const type = kebabCase(this.constructor.name);
      return MediaModel.query()
        .where('model_type', type)
        .where('model_id', this.id)
        .where('id', id)
        .first();
    };
  }
}

module.exports = Media;
