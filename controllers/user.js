const express = require("express");
const { User } = require("../models/user");



module.exports = {
    index,
    create,
    show,
    update,
    delete: destroy,
  };
  