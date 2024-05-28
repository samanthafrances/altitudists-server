const express = require("express");
const { Destination } = require("../models");

const index = async (req, res, next) => {
  try {
    res.json(await Destination.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
};

const show = async (req, res, next) => {
  try {
    res.json(await Destination.findById(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
};

const create = async (req, res, next) => {
  try {
    res.json(await Destination.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    res.json(await Destination.findByIdAndDelete(req.params.id));
  } catch (errord) {
    res.status(400).json(error);
  }
};

const update = async (req, res, next) => {
  try {
    res.json(
      await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
