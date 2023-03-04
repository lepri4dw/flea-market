import express from "express";
import Item from "../models/Item";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";

const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res, next) => {
  try {
    if (req.query.category) {
      const items = await Item.find({category: req.query.category});
      const newItems = items.map(item => {
        return {
          _id: item._id,
          title: item.title,
          image: item.image,
          price: item.price
        }
      });
      return res.send(newItems);
    }

    const items = await Item.find();
    const newItems = items.map(item => {
      return {
        _id: item._id,
        title: item.title,
        image: item.image,
        price: item.price
      }
    });
    return res.send(newItems);
  } catch (e) {
    return next(e);
  }
});

itemsRouter.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id).populate({path: 'user', select: ['displayName', 'phoneNumber']}).populate('category');

    if (!item) {
      return res.sendStatus(404);
    }

    return res.send(item);
  } catch (e) {
    return next(e);
  }
});

itemsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const item = new Item({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.file ? req.file.filename : null,
      user: user._id,
      category: req.body.category,
    });

    await item.save();
    return res.send(item);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

itemsRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.sendStatus(404);
    }

    if (user._id !== item.user) {
      return res.status(403).send({error: "You can't delete a product that isn't yours"});
    }

    await Item.deleteOne({_id: req.params.id});
    return res.send({message: 'Deleted'});
  } catch (e) {
    return next(e);
  }
});

export default itemsRouter;