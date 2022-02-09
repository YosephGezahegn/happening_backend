/**
 * EventValidation.js
 * @description :: validate each post and put request as per Event model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Event */
exports.schemaKeys = joi.object({
  eventName: joi.string().required(),
  description: joi.string().allow(null).allow(''),
  address: joi.object({
    city:joi.string(),
    country:joi.string(),
    lat:joi.number(),
    lng:joi.number(),
    locationName:joi.string(),
    details:joi.string()
  }).allow(0),
  startDateTime: joi.date().options({ convert: true }).allow(null).allow(''),
  endDateTime: joi.date().options({ convert: true }).allow(null).allow(''),
  organizer: joi.object({
    name:joi.string(),
    image:joi.string(),
    email:joi.string(),
    url:joi.string()
  }),
  image: joi.array().items(),
  attachments: joi.array().items(),
  isActive: joi.boolean(),
  ticketsAvailable: joi.boolean(),
  tickets: joi.number().integer().allow(0),
  ageLimit: joi.number().integer().allow(0),
  going: joi.number().integer().allow(0),
  eventCategory: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of Event for updation */
exports.updateSchemaKeys = joi.object({
  eventName: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  description: joi.string().allow(null).allow(''),
  address: joi.object({
    city:joi.string(),
    country:joi.string(),
    lat:joi.number(),
    lng:joi.number(),
    locationName:joi.string(),
    details:joi.string()
  }).allow(0),
  startDateTime: joi.date().options({ convert: true }).allow(null).allow(''),
  endDateTime: joi.date().options({ convert: true }).allow(null).allow(''),
  organizer: joi.object({
    name:joi.string(),
    image:joi.string(),
    email:joi.string(),
    url:joi.string()
  }),
  image: joi.array().items(),
  attachments: joi.array().items(),
  isActive: joi.boolean(),
  ticketsAvailable: joi.boolean(),
  tickets: joi.number().integer().allow(0),
  ageLimit: joi.number().integer().allow(0),
  going: joi.number().integer().allow(0),
  eventCategory: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Event for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      eventName: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      address: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      startDateTime: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      endDateTime: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      organizer: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      image: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      attachments: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      ticketsAvailable: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      tickets: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      ageLimit: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      going: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      eventCategory: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      createdAt: joi.any(),
      updatedAt: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
