import {model, Schema, Types} from "mongoose";
import Category from "./Category";
import User from "./User";

const ItemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: [0.01, 'Price cannot be negative or zero']
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Category.findById(value),
      message: 'Category does not exist'
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist'
    }
  }
});

const Item = model('Item', ItemSchema);
export default Item;