import mongoose from "mongoose";
import config from "./config";
import crypto from "crypto";
import User from "./models/User";
import Category from "./models/Category";
import Item from "./models/Item";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('items');
    await db.dropCollection('categories');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [Vasya, Artem, David] = await User.create({
    username: 'Vasya',
    displayName: 'Vasya',
    password: '12345',
    phoneNumber: '+996505000303',
    token: crypto.randomUUID()
  }, {
    username: 'artem1984@gmail.com',
    displayName: 'Artem',
    password: 'qwerty123',
    phoneNumber: '+996701986573',
    token: crypto.randomUUID()
  }, {
    username: 'David123',
    displayName: 'David',
    password: 'a@123456',
    phoneNumber: '+996777788778',
    token: crypto.randomUUID()
  });

  const [computers, cars, clothes, other] = await Category.create({
    title: 'Computers'
  }, {
    title: 'Cars'
  }, {
    title: 'Clothes'
  }, {
    title: 'Other'
  });

  await Item.create({
    title: "Intel Core i7 12700K",
    price: 350,
    description: 'I sell new CPU Inter Core I7',
    category: computers._id,
    image: "fixtures/cpu.jpg",
    user: Vasya._id,
  }, {
    title: "Samsung 990 Pro 1TB",
    price: 170,
    description: 'I sell used SSD, almost new',
    category: computers._id,
    image: "fixtures/ssd.jpg",
    user: David._id,
  }, {
    title: "Tesla Model S",
    price: 80000,
    description: '2019 Tesla Model S in excellent condition',
    category: cars._id,
    image: "fixtures/tesla.webp",
    user: Vasya._id,
  }, {
    title: "Nike Air Jordan 1",
    price: 150,
    description: 'Brand new Nike Air Jordan 1 in gray and black',
    category: clothes._id,
    image: "fixtures/jordans.webp",
    user: Artem._id,
  }, {
    title: "Leather Armchair",
    price: 400,
    description: 'Luxurious leather armchair in excellent condition',
    category: other._id,
    image: "fixtures/armchair.jpg",
    user: Artem._id,
  });

  await db.close();
}

run().catch(console.error);