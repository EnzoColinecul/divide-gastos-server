const verifyId = (id) => {
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return false;
  }
  return true;
};

module.exports = {
  verifyId,
};
