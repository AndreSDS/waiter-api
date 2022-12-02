import { model, Schema } from 'mongoose';

export const Order = model('Order', new Schema({
  table: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['waiting', 'in-progress', 'done'],
    default: 'waiting',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  products: {
    required: true,
    type: [
      {
        product: {
          required: true,
          type: Schema.Types.ObjectId,
          ref: 'Product',
        }
      }
    ]
  },
  quantity: {
    type: Number,
    default: 1,
  },
}
));
