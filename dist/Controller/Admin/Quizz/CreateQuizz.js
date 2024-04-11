"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuizz = void 0;
const AdminSchema_1 = require("../../../Model/AdminSchema");
const UploadImage_1 = require("../../../utils/UploadImage");
const CreateQuizz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { data } = req.body;
        data = JSON.parse(data);
        const { quizzTitle, questions } = data;
        const file = req.file;
        if (!file) {
            return res.status(400).json("Please upload a file");
        }
        const imageUrl = yield (0, UploadImage_1.uploadImageQuizz)(file);
        const quizz = new AdminSchema_1.QuizzModel({
            quizzTitle,
            ImageQuizz: imageUrl,
        });
        yield quizz.save();
        const questionsData = yield Promise.all(questions.map((question) => __awaiter(void 0, void 0, void 0, function* () {
            const { title, weight } = question;
            const weightData = weight.map((item) => {
                return new AdminSchema_1.WeightModel({
                    jobID: item.jobID,
                    weight: item.weight,
                });
            });
            yield AdminSchema_1.WeightModel.insertMany(weightData);
            const weightID = weightData.map((item) => item._id);
            return new AdminSchema_1.ChoiseModel({
                answer: title,
                weight: weightID,
            });
        })));
        yield AdminSchema_1.ChoiseModel.insertMany(questionsData);
        quizz.choies = questionsData.map((item) => item._id);
        yield quizz.save();
        res.status(201).json("Quizz created successfully");
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.CreateQuizz = CreateQuizz;
