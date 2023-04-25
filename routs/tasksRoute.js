const express = require("express");
const mongoose = require("mongoose");

const Task = mongoose.model("tasks");
const tasksRouter = express.Router();

//Create
tasksRouter.post("/addTask", async (req, res) => {
  const { Title, Description, DueDate, Priority, Status } = req.body;
  if (!Title || !Description || !DueDate || !Priority || !Status)
    return res.status(403).send({ error: "Must provide all fields" });
  try {
    const client_task = new Task({
      Title,
      Description,
      DueDate,
      Priority,
      Status,
    });

    //add a check to see if it's already exists
    await client_task.save();
  } catch (error) {
    console.log(`error by creating new task ${error}`);
    res
      .status(403)
      .send({ error: `Opss can't create new tasks. please try again` });
  }
});

//Read
tasksRouter.get("/tasks/:id", async (req, res) => {
  //currently the check is with the obj id- can get better
  let { id } = req.params;
  id = id.toString();

  let task = null;
  try {
    task = await Task.findOne({ _id: id });
    console.log(task);
    res.send(task);
  } catch (error) {
    console.log(`error by trying to fetch tasks from server ${error}`);
    res.status(403).send(`Opss can't signin. please try again later`);
  }
});

//Update
tasksRouter.patch("/changeTask/:UserTitle", async (req, res) => {
  let { UserTitle } = req.params;
  UserTitle = UserTitle.toString();
  const { Title, Description, DueDate, Priority, Status } = req.body;
  if (!Title || !Description || !DueDate || !Priority || !Status)
    return res.status(403).send({ error: "Must provide all fields" });
  try {
    const afterUpdate = {
      Title,
      Description,
      DueDate,
      Priority,
      Status,
    };
    console.log;
    let doc = await Task.findOneAndUpdate({ Title: UserTitle }, afterUpdate);

    res.send(doc);
  } catch (error) {
    console.log(`error by creating new task ${error}`);
    res
      .status(403)
      .send({ error: `Opss can't create new task. please try again` });
  }
});

//Delete
tasksRouter.delete("/tasks/delete/:UserTitle", async (req, res) => {
  let { UserTitle } = req.params;
  UserTitle = UserTitle.toString();
  console.log(UserTitle);
  let task = null;
  try {
    await Task.deleteOne({ Title: UserTitle });
    console.log("deleted item from db");
  } catch (error) {
    console.log(`error by trying to delete item from db ${error}`);
    res.status(403).send(`error trying to delete something from db`);
  }
});

//search by get - the same can be done for a search in any filter, title , date etc'
tasksRouter.get("/search/:title", async (req, res) => {
  let { title } = req.params;
  title = title.toString();

  console.log(title);

  let task = null;
  try {
    task = await Task.find({
      Title: { $regex: title, $options: "i" },
    });
    console.log(task);
    res.send(task);
  } catch (error) {
    console.log(`error by trying to fetch tasks from server ${error}`);
    res.status(403).send(`Opss can't signin. please try again later`);
  }
});

//robust all fields search

tasksRouter.get("/search/smart/:query", async (req, res) => {
  let { query } = req.params;
  query = query.toString();

  console.log(query);

  let task = null;
  try {
    task = await Task.find({
      $or: [
        { Title: { $regex: query, $options: "i" } },
        { Description: { $regex: query, $options: "i" } },
        { Priority: { $regex: query, $options: "i" } },
        { Status: { $regex: query, $options: "i" } },
      ],
    });
    console.log(task);
    res.send(task);
  } catch (error) {
    console.log(`error by trying to fetch tasks from server ${error}`);
    res.status(403).send(`Opss can't signin. please try again later`);
  }
});

module.exports = tasksRouter;
