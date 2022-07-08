const client = require("../libs/db");

class FoodController {
  static async getAll(req, res) {
    const infoMessage = (await req.consumeFlash("info"))[0];
    const errorMessage = (await req.consumeFlash("error"))[0];
    const food = await client.food.findMany({
      include: {
        categories: {
          include: {
            category:true
          }
        }
      },
      orderBy: [
        {
          id:"desc"
        }
      ]
    });

    return res.render("food", {
      messages:[
        {info:true && infoMessage, content:infoMessage},
        {error:true && errorMessage, content:errorMessage}
      ],
      food
    });
  }

  static async getAddForm(req, res) {
    const infoMessage = (await req.consumeFlash("info"))[0];
    const errorMessage = (await req.consumeFlash("error"))[0];
    const categories = await client.category.findMany();

    return res.render("admin/add_food", {
      messages: [
        {info:true && infoMessage, content:infoMessage},
        {error:true && errorMessage, content:errorMessage}
      ],
      categories
    });
  }

  static async add(req, res) {
    try {
      const { name, price, description, image } = req.body;

      if(!name?.trim() || !price?.trim() || !description?.trim() || !image?.trim()) {
        await req.flash("error", "Fill all the fields");
        return res.redirect("/food/addFood");
      }

      let { categories } = req.body;
      if(!Array.isArray(categories)) {
        categories = [categories];
      }
      categories = categories.filter(category => typeof(category) === "string");
      const noCategory = categories.includes("no-category");
      const data = {
        name,
        price: parseFloat(price),
        description,
        image
      };
      if(!noCategory) {
        const categorieIDs = categories.map(categoryID => ({categoryID:parseInt(categoryID)}));
        data.categories = {
          create: categorieIDs
        };
      }

      await client.food.create({
        data
      });
      await req.flash("info", "Food added successfully");
      return res.redirect("/food");
    } catch(error) {
      console.log(error);
      await req.flash("error", "Failed to add food");
      return res.redirect("/food/addFood");
    }
  }

  static async addCategory(req, res) {
    try {
      const { name } = req.body;

      if(!name?.trim()) {
        await req.flash("error", "Fill the field");
        return res.redirect("/food/addFood");
      }

      await client.category.create({
        data: {
          name
        }
      });
      await req.flash("info", "Category added successfully");
      return res.redirect("/food/addFood");
    } catch(error) {
      if(error.code === "P2002") {
        await req.flash("error", "Category already added");
        return res.redirect("/food/addFood");
      }

      await req.flash("error", "Failed to add category");
      return res.redirect("/food/addFood");
    }
  }

  static async getEditForm(req, res) {
    try {
      const idFood = parseInt(req.params.idFood);
      const food = await client.food.findUnique({
        where: {
          id: idFood
        }
      });
      return res.render("admin/edit_food", {
        food
      });
    } catch(error) {
      await req.flash("error", "Failed to lookup at that food");
      return res.redirect("/food");
    }
  }

  static async edit(req, res) {
    return res.end("Editing... " + req.params.idFood);
  }

  static async getDeleteConfirmation(req, res) {
    try {
      const idFood = parseInt(req.params.idFood);
      const food = await client.food.findUnique({
        where: {
          id: idFood
        }
      });

      return res.render("admin/food_confirm_delete", {
        food
      });
    } catch(error) {
      await req.flash("error", "Failed to lookup at that food");
      return res.redirect("/food");
    }
  }

  static async delete(req, res) {
    try {
      const idFood = parseInt(req.params.idFood);
      
      await client.food.delete({
        where: {
          id: idFood
        }
      });
      await req.flash("info", "Food deleted successfully");
      return res.redirect("/food");
    } catch(error) {
      await req.flash("error", "Failed to delete food");
      return res.redirect("/food");
    }
  }
}

module.exports = FoodController;