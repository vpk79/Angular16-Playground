import { Router } from "express";
import { sample_food, sample_tags } from "../data";
import asyncHandler from 'express-async-handler'
import { FoodModel } from "../models/food.models";


const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const foodsCount = await FoodModel.countDocuments();
        if(foodsCount > 0){
            res.send("Seed is already done");
            return;
        }

        await FoodModel.create(sample_food);
        res.send("Seed Is Done!")
    }
))


router.get("/", asyncHandler(
    async (req, res) => {
        const foods = await FoodModel.find();
        res.send(foods);
}))

router.get("/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const foods = sample_food.filter(food => food.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
    res.send(foods);
})

router.get("/tags", (req, res) => {
    res.send(sample_tags)
})

router.get("/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const foods = sample_food.filter(food => food.tags?.includes(tagName));
    res.send(foods);
})

router.get("/:foodId", (req, res) => {
    const foodId = req.params.foodId;
    const food = sample_food.find(food => food.id == foodId);
    res.send(food);
})

export default router;