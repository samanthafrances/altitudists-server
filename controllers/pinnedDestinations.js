const express = require("express");
const { PinnedDestination } = require("../models")

const index = async (req, res, next) => {
    try {
      res.json(await PinnedDestination.find({}));
    } catch (error) {
      res.status(400).json(error);
    }
  };
  
  const show = async (req, res, next) => {
    try {
      res.json(await PinnedDestination.findById(req.params.id));
    } catch (error) {
      res.status(400).json(error);
    }
  };
  
  const create = async (req, res, next) => {
    try {
      res.json(await PinnedDestination.create(req.body));
    } catch (error) {
      res.status(400).json(error);
    }
  };
  
  const destroy = async (req, res, next) => {
    try {
      res.json(await PinnedDestination.findByIdAndDelete(req.params.id));
    } catch (errord) {
      res.status(400).json(error);
    }
  };
  
  const update = async (req, res, next) => {
    try {
      res.json(
        await PinnedDestination.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
  