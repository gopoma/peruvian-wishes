const client = require("../libs/db");

class OrderController {
  static async getActualOrder(req, res) {
    return res.json({message:"getActualOrder"});
  }

  static async makeOrderComplete(req, res) {
    return res.json({message:"makeOrderComplete"});
  }

  static async getCompletedOrders(req, res) {
    return res.json({message:"getCompletedOrders"});
  }

  static async addFood(req, res) {
    try {
      const {activeOrder} = req.session.user;
      const idFood = parseInt(req.params.idFood);

      await client.order.update({
        where: {
          id: activeOrder
        },
        data: {
          food: {
            create: {
              food: {
                connect: {
                  id: idFood
                }
              }
            }
          }
        }
      });

      await req.flash("info", "Food added successfully");
      return res.redirect("/food");
    } catch(error) {
      console.log(error);
      await req.flash("error", "Failed to add food");
      return res.redirect("/food");
    }
  }
  
  static async deleteFood(req, res) {
    return res.json({message:"deleteFood"});
  }
}

module.exports = OrderController;