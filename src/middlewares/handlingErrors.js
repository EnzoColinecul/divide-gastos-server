const handlingErrors = (error, req, res) => res.status(500).json({
  ok: false,
  msg: 'internal server error',
  details: error,
});

module.exports = {
  handlingErrors,
};
