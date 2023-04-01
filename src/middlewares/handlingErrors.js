const handlingErrors = (error, req, res, next) => {
  const errorResponse = (msg) => res.status(500).json({
    ok: false,
    msg,
    details: error,
  });

  switch (error.type) {
    case 'token':
      errorResponse('Error in validating token ');
      break;
    case 'renew':
      errorResponse('Error renewing token');
      break;
    case 'fields':
      errorResponse('Error in field middleware');
      break;
    case 'login':
      errorResponse('Error in login controller');
      break;
    case 'register':
      errorResponse('Error in register controller');
      break;
    default:
      next();
      break;
  }
};

module.exports = {
  handlingErrors,
};
