// const client = require("../libs/db");

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
    return res.json({message:"addFood"});
  }
  
  static async deleteFood(req, res) {
    return res.json({message:"deleteFood"});
  }
}

module.exports = OrderController;