const express = require("express");
const { Destinations } = require("../models/destination");



module.exports = {
    index,
    create,
    show,
    update,
    delete: destroy,
  };
  