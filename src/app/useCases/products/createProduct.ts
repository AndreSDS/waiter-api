import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export async function createProduct(req: Request, res: Response) {

  try {
    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      imagePath: req.file?.filename,
      ingredients: req.body.ingredients ? JSON.parse(req.body.ingredients) : [],
    };

    const productCreated = await Product.create(product);

    res.status(201).json(productCreated);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
