module.exports.errorMain((err, req, res) => {
  res.status(err.statusCode).send({ message: err.message });
});
