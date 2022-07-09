const client = require("../libs/db");

class OrderController {
  static async getCurrentOrder(req, res) {
    try {
      const infoMessage = (await req.consumeFlash("info"))[0];
      const errorMessage = (await req.consumeFlash("error"))[0];
      const {activeOrder} = req.session.user;

      const order = await client.order.findUnique({
        where: {
          id: activeOrder
        },
        include: {
          food: {
            include: {
              food: true
            }
          }
        }
      });

      const items = order.food;
      const total = items.reduce((result, item) => {
        return result + item.amount * item.food.price;
      }, 0);
      return res.render("current_order", {
        messages: [
          {info:true && infoMessage, content:infoMessage},
          {error:true && errorMessage, content:errorMessage}
        ],
        items: order.food,
        total
      });
    } catch(error) {
      console.log(error);
      await req.flash("error", "A wild error has appeared");
      return res.redirect("/");
    }
  }

  static async makeOrderComplete(req, res) {
    try {
      const {activeOrder, id} = req.session.user;

      await client.order.update({
        where: {
          id: activeOrder
        },
        data: {
          completed: true
        }
      });
      
      const newOrder = await client.order.create({
        data: {
          completed: false,
          user: {
            connect: {
              id
            }
          }
        }
      });
      await client.user.update({
        data: {
          activeOrder: newOrder.id
        },
        where: {
          id
        }
      });
      req.session.user.activeOrder = newOrder.id;
      await req.flash("info", "Current order completed successfully");
      return res.redirect("/orders/completed");
    } catch(error) {
      await req.flash("error", "Failed to complete current order");
      return res.redirect("/orders");
    }
  }

  static async getCompletedOrders(req, res) {
    return res.json({message:"getCompletedOrders"});
  }

  static async addFood(req, res) {
    try {
      const {activeOrder} = req.session.user;
      const idFood = parseInt(req.params.idFood);

      const item = await client.foodOrder.findUnique({
        where: {
          foodID_orderID: {
            orderID: activeOrder,
            foodID: idFood
          }
        },
      });

      if(item) {
        await client.foodOrder.update({
          where: {
            foodID_orderID: {
              orderID: activeOrder,
              foodID: idFood
            }
          },
          data: {
            amount: item.amount + 1
          }
        });
      } else {
        await client.foodOrder.create({
          data: {
            order: {
              connect: {
                id: activeOrder
              }
            },
            food: {
              connect: {
                id: idFood
              }
            },
            amount: 1
          }
        });
      }

      await req.flash("info", "Food added successfully");
      return res.redirect("/orders");
    } catch(error) {
      console.log(error);
      await req.flash("error", "Failed to add food");
      return res.redirect("/food");
    }
  }
  
  static async deleteFood(req, res) {
    try {
      const {activeOrder} = req.session.user;
      const idFood = parseInt(req.params.idFood);

      await client.foodOrder.delete({
        where: {
          foodID_orderID: {
            orderID: activeOrder,
            foodID: idFood
          }
        }
      });
      await req.flash("info", "Food deleted from current order successfully");
      return res.redirect("/orders");
    } catch(error) {
      console.log(error);
      await req.flash("error", "Failed to delete that food from current order");
      return res.redirect("/orders");
    }
  }
}

module.exports = OrderController;