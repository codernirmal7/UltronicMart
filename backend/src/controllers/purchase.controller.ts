import { Request, Response } from "express";
import ProductModel from "../models/product.model";
import UserModel from "../models/user.model";
import OrderModel from "../models/OrderSchema.model";

const purchaseProduct = async (req: Request, res: Response): Promise<void> => {
  const { email, cardNumber , cardExpireYDate,cardExpireMDate , cardCvv, address , postalCode } = req.body;
  const productId: string[] = [];
  let totalPriceOfProducts: number = 0;
  let productsToUpdate: any[] = [];

  //validation
  if(!cardNumber){
    res.status(404).json({ message: "Please enter a card number." });
      return;
  }
  if(cardNumber.length > 16 || cardNumber.length < 16){
    res.status(404).json({ message: "Invalid card number." });
    return;
  }
  if(!cardExpireYDate){
    res.status(404).json({ message: "Please enter a card expire year." });
      return;
  }
  if(!cardExpireMDate){
    res.status(404).json({ message: "Please enter a card expire month." });
      return;
  }
  if(!cardCvv){
    res.status(404).json({ message: "Please enter a card cvv." });
      return;
  }
  if(!address){
    res.status(404).json({ message: "Please enter your address." });
      return;
  }
  if(!postalCode){
    res.status(404).json({ message: "Please enter a postal code." });
      return;
  }
  
  
  try {
    // 1. Find the user
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // 2. Collect productIds and calculate total price
    user.cart.forEach((item) => {
      productId.push(item.productId.toString());
    });

    // 3. Fetch products from DB
    const products = await ProductModel.find({ _id: { $in: productId } });

    if (!products.length) {
      res.status(404).json({ message: "Products not found" });
      return;
    }

    // 4. Calculate total price of the products in the cart and prepare the order items
    const productPrices = products.map((item: any) => {
      const cartItem = user.cart.find((cartItem) => cartItem.productId.toString() === item._id.toString());
      if (cartItem) {
        const productTotalPrice = item.price * cartItem.quantity;
        totalPriceOfProducts += productTotalPrice;

        // Prepare stock update data
        productsToUpdate.push({
          productId: item._id,
          quantity: cartItem.quantity,
          stock: item.stock - cartItem.quantity, // Deduct quantity from stock
          purchaseCount: item.purchaseCount + cartItem.quantity, // Increase purchase count
        });

        return productTotalPrice;
      }
      return 0;
    });

  
    // 6. Handle successful payment

    // 7. Update product stock and purchase count for each product
      for (const update of productsToUpdate) {
        const product = await ProductModel.findById(update.productId);
        if (product && product.stock > 0 ) {
          product.stock = update.stock;
          product.purchaseCount = update.purchaseCount;
          await product.save();
        }else{
          res.status(404).json({ message: "Error while updating product stocks and purchaseCount." });
          return;
        }
      }

      // 8. Update user's purchase history
      for (const cartItem of user.cart) {
        await UserModel.findByIdAndUpdate(user._id, {
          $push: {
            purchaseHistory: {
              productId: cartItem.productId,
              quantity: cartItem.quantity,
              purchaseDate: new Date(),
            },
          },
        });
      }
     
      // 10. Create a new order in the Order collection
      const order = new OrderModel({
        orderNumber: 'ORD-' + Date.now().toString(), // Generate unique order number
        userId: user._id,
        products: user.cart.map((cartItem) => ({
          productId: cartItem.productId,
          quantity: cartItem.quantity,
        })),
        totalAmount: totalPriceOfProducts,
        status: "completed",
      });

      await order.save(); // Save order to the database

       //9. Remove products from cart
       user.cart = []
       await user.save()
 

      res.status(200).json({ message: "Purchase successful", order });
    
  } catch (error) {
    res.status(500).json({ message: "Error processing purchase", error: error });
  }
};

export { purchaseProduct };
