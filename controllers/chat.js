const express = require("express");
const { Chat } = require("../models/chat");



module.exports = {
    index,
    create,
    show,
    update,
    delete: destroy,
  };
  