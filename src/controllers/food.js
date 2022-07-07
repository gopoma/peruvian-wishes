const client = require("../libs/db");

class FoodController {
  static async getAll(req, res) {
    const infoMessage = (await req.consumeFlash("info"))[0];
    const food = await client.food.findMany();

    return res.render("food", {
      messages:[{info:true && infoMessage, content:infoMessage}],
      food
    });
  }

  static getAddForm(req, res) {
    return res.render("admin/add_food");
  }

  static async add(req, res) {
    try {
      const { name, price, description, image } = req.body;
      if(!name || !price || !description || !image) {
        return res.render("admin/add_food", {
          messages: [{error:true, content:"Fill all the fields"}],
          foodData: req.body
        });
      }
      const data = {
        name,
        price: parseFloat(price),
        description,
        image
      };
      await client.food.create({
        data
      });
  
      await req.flash("info", "Food added successfully");
      return res.redirect("/food");
    } catch(error) {
      return res.render("admin/add_food", {
        messages: [{error:true, content:"Failed to add food"}],
        foodData: req.body
      });
    }
  }
}

module.exports = FoodController;