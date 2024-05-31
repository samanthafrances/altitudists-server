const express = require("express");
const { BuddyPass } = require("../models/");

const index = async (req, res, next) => {
  try {
    res.json(await BuddyPass.find().populate("destination", "name"));
  } catch (error) {
    res.status(400).json(error);
  }
};

const show = async (req, res, next) => {
  try {
    res.json(await BuddyPass.findById(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
};

const create = async (req, res, next) => {
  try {
    await BuddyPass.create(req.body);
    res.status(201).send(`Buddy Pass created successfully!`);
  } catch (error) {
    res.status(400).json(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    res.json(await BuddyPass.findByIdAndDelete(req.params.id));
  } catch (errord) {
    res.status(400).json(error);
  }
};

const update = async (req, res, next) => {
  try {
    res.json(
      await BuddyPass.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  index,
  show,
  create,
  delete: destroy,
  update,
};
