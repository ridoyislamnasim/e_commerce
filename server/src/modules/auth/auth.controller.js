const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const AuthService = require("./auth.service.js");

class AuthController {
  authUserSingUp = withTransaction(async (req, res, next, session) => {
    const { name, email, phone, password } = req.body;
    console.log("THis is body", req.body);

    const payload = {
      name,
      email,
      phone,
      password,
    };
    const auth = await AuthService.authUserSingUp(payload, session);
    const resDoc = responseHandler(200, "login successfully", auth);
    res.status(resDoc.statusCode).json(resDoc);
  });

  createUser = withTransaction(async (req, res, next, session) => {
    const { name, email, phone, password } = req.body;
    console.log("req.body from create user controller......", req.body);
    const payload = {
      name,
      email,
      phone,
      password,
    };
    const auth = await AuthService.createUser(payload, session);
    const resDoc = responseHandler(201, "User created successfully", auth);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getUser = withTransaction(async (req, res, next, session) => {
    const { email, phone } = req.query;
    console.log("req.query from get user controller......", req.query);
    const payload = {
      email,
      phone,
    };
    const auth = await AuthService.getUser(payload, session);
    const resDoc = responseHandler(200, "User found successfully", auth);
    res.status(resDoc.statusCode).json(resDoc);
  });
  authUserSignIn = withTransaction(async (req, res, next, session) => {
    console.log("req.body from signin controller......", req.body);
    const { email, phone, password } = req.body;

    const payload = {
      email,
      phone,
      password,
    };

    const auth = await AuthService.authUserSignIn(payload, session);
    const resDoc = responseHandler(201, "login successfully", auth);
    res.status(resDoc.statusCode).json(resDoc);
  });
  authForgetPassword = withTransaction(async (req, res, next, session) => {
    const { email } = req.body;
    const payload = {
      email,
    };
    const user = await AuthService.authForgetPassword(payload, session);
    const resDoc = responseHandler(
      200,
      "Forget Password successfully, OTP send your email!",
      user
    );
    res.status(resDoc.statusCode).json(resDoc);
  });
  authForgetPasswordVarification = withTransaction(
    async (req, res, next, session) => {
      const { email, otp, password } = req.body;
      console.log(
        { email: email, otp: otp, password: password },
        "req.body from reset password controller .........."
      );
      const payload = {
        email,
        otp,
        password,
      };
      console.log(payload, "payload from reset password controller???????????");
      const user = await AuthService.authForgetPasswordVarification(
        payload,
        session
      );
      const resDoc = responseHandler(
        200,
        "Forget Password successfully, User updated!",
        user
      );
      res.status(resDoc.statusCode).json(resDoc);
    }
  );

  getUserById = withTransaction(async (req, res, next, session) => {
    const userId = req.user.user_info_encrypted.id;
    const user = await AuthService.getUserById(userId, session);
    const resDoc = responseHandler(200, "User get successfully", user);
    res.status(resDoc.statusCode).json(resDoc);
  });
  updateUser = catchError(async (req, res, next, session) => {
    const userId = req.user.user_info_encrypted.id;
    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      phone: req?.body?.phone,
      name: req?.body?.name,
      address: req?.body?.address,
    };
    const user = await AuthService.updateUser(
      userId,
      payloadFiles,
      payload,
      session
    );
    const resDoc = responseHandler(201, "User updated successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllUser = withTransaction(async (req, res, next, session) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    };
    const users = await AuthService.getAllUser(payload, session);
    const resDoc = responseHandler(200, "Users get successfully", users);
    res.status(resDoc.statusCode).json(resDoc);
  });

  getSingleUser = withTransaction(async (req, res, next, session) => {
    const userId = req.params.id;
    const user = await AuthService.getSingleUser(userId, session);
    const resDoc = responseHandler(200, "User get successfully", user);
    res.status(resDoc.statusCode).json(resDoc);
  });
  
  getDeleteUser = withTransaction(async (req, res, next, session) => {
    const userId = req.params.id;
    const user = await AuthService.getDeleteUser(userId, session);
    const resDoc = responseHandler(200, "User deleted successfully", user);
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new AuthController();
