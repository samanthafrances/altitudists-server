const express = require("express");
const { Favorites } = require("../models/favorite");



module.exports = {
    index,
    create,
    show,
    update,
    delete: destroy,
  };
  