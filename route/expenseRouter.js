import express from "express";
import Tracker from "../model/trackerSchema.js";

const router = express.Router();

// Post expense:
router.post("/writeExpense", async (req, res) => {
  try {
    console.log(req.body)
    const { name, description, category, price, paymentMethod } = req.body ;

    if (!name || !category || !price || !paymentMethod) {
      return res.status(412).json({ msg: "Fill all the fields correctly" });
    }

    const expense = {
      name,
      description,
      category,
      price,
      paymentMethod,
    };

    const tracker = await Tracker.create(expense);
    return res.status(200).json({ msg: "Expense added successfully", tracker });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

//get expenses
router.get("/readExpense" , async( req, res) => {
  try{
    const expense = await Tracker.find();
    return res.status(200).json({msg : "successfully fetched expenses" , expense});
  }catch(error){
    console.log(error.message);
    return res.status(404).json({msg : "error while getting expense data"})
  }
})

//delete expense
router.delete("/deleteExpense/:id" , async(req,res) => {
  try{
    const {id} = req.params
    const expense = await Tracker.findByIdAndDelete(id);
    if(!expense){
      return res.status(412).json({msg:"no such expense exist"})
    }
    return res.status(200).json({msg : "expence deleted successfully" , expense})
  }catch(error){
    console.log(error.message)
    return res.status(404).json({msg : "error while deleting expense"})
  }
})

export default router;
