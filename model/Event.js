/**
 * Event.js
 * @description :: model of a database collection Event
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema(
  {

    eventName: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: false
    },

    address: {
      city: {
        type: String,
        required: false
      },
      country: {
        type: String,
        required: false
      },
      lat: {
        type: Number,
        required: false
      },
      lng: {
        type: Number,
        required: false
      },
      locationName: {
        type: String,
        required: false
      },
      details: {
        type: String,
        required: false
      }
    },

    startDateTime: {
      type: Date,
      required: false
    },

    endDateTime: {
      type: Date,
      required: false
    },

    organizer: {
      name: {
        type: String,
        required: false
      },
      image: {
        type: String,
        required: false
      },
      email: {
        type: String,
        required: false
      },
      url: {
        type: String,
        required: false
      }
    },

    image: {
      type: Array,
      required: false
    },

    attachments: {
      type: Array,
      required: false
    },

    going: {
      type: Number,
      required: false
    },

    ticketsAvailable: {
      type: Boolean,
      required: false
    },

    tickets: {
      type: Number,
      required: false
    },

    ticketPrice: {
      type: Number,
      required: false
    },

    ageLimit: {
      type: Number,
      required: false
    },

    color: {
      type: String,
      required: false
    },

    onlineEvent: {
      type: Boolean,
      required: false
    },

    eventCategory: {
      ref: 'EventCategories',
      type: Schema.Types.ObjectId
    },
    isActive: { type: Boolean },

    createdAt: { type: Date },

    updatedAt: { type: Date },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },

    addedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },

    isDeleted: { type: Boolean }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);
schema.pre('save', async function (next)
{
  this.isDeleted = false;
  this.isActive = true;
  next();
});

schema.pre('insertMany', async function (next, docs)
{
  if (docs && docs.length)
  {
    for (let index = 0; index < docs.length; index++)
    {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
    }
  }
  next();
});

schema.method('toJSON', function ()
{
  const {
    _id, __v, ...object
  } = this.toObject({ virtuals: true });
  object.id = _id;

  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const Event = mongoose.model('Event', schema);
module.exports = Event;