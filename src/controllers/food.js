const client = require("../libs/db");

class FoodController {
  static async getAll(req, res) {
    const food = await client.food.findMany();

    return res.render("food", {
      food
    });
  }
}

module.exports = FoodController;