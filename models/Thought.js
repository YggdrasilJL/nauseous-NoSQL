const dayjs = require('dayjs');

const { Schema, model } = require('mongoose');

// reactions

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    max: [280, 'Cannot exceed 280 characters!'],
  },
  username: {
    type: String,
    required: true,
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtDate) => dayjs(createdAtDate).format('YYYY-MM-DD'),
  },
});

// thoughts

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max: [280, 'Cannot exceed 280 characters!'],
      min: [1, 'Cannot be blank!'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtDate) => dayjs(createdAtDate).format('YYYY-MM-DD'),
    },
    username: {
      type: String,
      required: true,
      ref: 'user',
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions ? this.reactions.length : 0;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
