const jwtLib = require("../config/jwt");
const crypto = require("crypto");
require("dotenv").config();

const logger = require("../config/logger");

const {
  loginProses,
  userPrime,
  byUser,
  byUserWhere,
  addUser,
  updateUser,
  deleteUser,
} = require("../models/modelUser");

const response500 = {
  status: "Error",
  message: "Internal Server Error!",
};
const response400 = {
  status: "Error",
  message: "Bad Request!",
};

// user login
exports.searchUser = async (req, res) => {
  const log = logger.loggerData({ req });
  const data = req.body;
  if (data.username) {
    const username = data.username;
    // console.log("request", data);

    const hashedPassword = crypto
      .createHash("sha1")
      .update(data.password)
      .digest("hex");

    try {
      const dataUser = await loginProses(
        data.username,
        hashedPassword
        // data.password
      );
      console.log("A");
      console.log(dataUser);
      console.log("B");
      if (dataUser.statusCode == 200) {
        const expiresInSeconds = parseInt(process.env.JWT_EXPIRED_SECOND);

        let roleString;
        if (dataUser.data.role == "1") {
          roleString = "Admin Sistem";
        } else {
          roleString = "Admin";
        }
        // Jika otentikasi berhasil, berikan token JWT
        const token = jwtLib.jwt.sign(
          { username, role: roleString, user_id: dataUser.data.id },
          jwtLib.secretKey,
          {
            // expiresIn: "600", //expired 10 menit 60 * 10
            expiresIn: expiresInSeconds,
          }
        );

        // Dapatkan informasi tentang token yang baru saja dibuat
        const decodedToken = jwtLib.jwt.decode(token);
        const createdAt = new Date(decodedToken.iat * 1000); // Konversi ke milidetik
        const expiresAt = new Date((decodedToken.exp || 0) * 1000); // Konversi ke milidetik

        const response = {
          statusCode: dataUser.statusCode,
          status: dataUser.status,
          message: dataUser.message,
          transactioId: log.TransactionID,
          data: {
            username: dataUser.data.username,
            fullname: dataUser.data.name,
            role: dataUser.data.role,
            akses: roleString,
            status: dataUser.data.status,
            token: token,
          },
        };
        logger.loggerData({
          timeStart: log.TimeStamp,
          req,
          result: response,
          flag: "STOP",
          message: response.message,
        });
        res.status(dataUser.statusCode).json(response);
      } else {
        const response = {
          statusCode: dataUser.statusCode,
          status: dataUser.status,
          message: dataUser.message,
          transactioId: log.TransactionID,
        };
        logger.loggerData({
          timeStart: log.TimeStamp,
          req,
          result: response,
          flag: "STOP",
          message: response.message,
        });
        res.status(dataUser.statusCode).json(response);
      }
    } catch (error) {
      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        logLevel: "ERROR",
        result: response500,
        flag: "STOP",
        message: error.message,
      });
      response500.transactioId = log.TransactionID;
      res.status(500).json(response500);
    }
  } else {
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response400,
      flag: "STOP",
      message: response400.message,
    });
    response400.transactioId = log.TransactionID;
    res.status(400).json(response400);
  }
};

exports.userPrime = async (req, res) => {
  const log = logger.loggerData({ req });

  try {
    // Ambil parameter page dan row_count dari query string
    const page = req.query.page;
    const rowCount = req.query.row_count;

    const dataUser = await userPrime(page, rowCount);

    const response = {
      statusCode: dataUser.statusCode,
      status: dataUser.status,
      message: dataUser.message,
      transactioId: log.TransactionID,
      totalData: dataUser.totalData,
      data: dataUser.data,
    };
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataUser.statusCode).json(response);
  } catch (error) {
    // console.log(error);
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response500,
      flag: "ERROR",
      message: error.message,
    });
    response500.transactioId = log.TransactionID;
    res.status(500).json(response500);
  }
};

// user by username
exports.byUser = async (req, res) => {
  const log = logger.loggerData({ req });
  const id = req.params.id;
  if (id) {
    try {
      const dataUser = await byUser(id);

      const response = {
        statusCode: dataUser.statusCode,
        status: dataUser.status,
        message: dataUser.message,
        transactionId: log.TransactionID,
        data: dataUser.data,
      };
      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response,
        flag: "STOP",
        message: response.message,
      });
      res.status(dataUser.statusCode).json(response);
    } catch (error) {
      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response500,
        flag: "ERROR",
        message: error.message,
      });
      response500.transactioId = log.TransactionID;
      res.status(500).json(response500);
    }
  } else {
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response400,
      flag: "STOP",
      message: response400.message,
    });
    response400.transactioId = log.TransactionID;
    res.status(400).json(response400);
  }
};
// user by where
exports.byUserWhere = async (req, res) => {
  const log = logger.loggerData({ req });
  const { id, username, role, status } = req.body;
  // Ambil parameter page dan row_count dari query string
  const page = req.query.page;
  const rowCount = req.query.row_count;
  try {
    let whereClause = {};
    // Cek jika parameter id_pengguna
    if (id) {
      whereClause.id = id;
    }
    // Cek jika parameter username
    if (username) {
      whereClause.username = username;
    }
    // Cek jika parameter role_akses
    if (role) {
      whereClause.role = role;
    }
    // Cek jika parameter status_aktif
    if (status) {
      whereClause.status = status;
    }
    const databyUserWhere = await byUserWhere(whereClause, page, rowCount);

    const response = {
      statusCode: databyUserWhere.statusCode,
      status: databyUserWhere.status,
      message: databyUserWhere.message,
      transactionId: log.TransactionID,
      totalData: databyUserWhere.totalData,
      data: databyUserWhere.data,
    };
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(databyUserWhere.statusCode).json(response);
  } catch (error) {
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response500,
      flag: "ERROR",
      message: error.message,
    });
    response500.transactioId = log.TransactionID;
    res.status(500).json(response500);
  }
};

// add User
exports.addUser = async (req, res) => {
  const log = logger.loggerData({ req });
  const token = req.headers["authorization"];
  const validToken = token.split(" ");
  let userLogin;
  jwtLib.jwt.verify(validToken[1], jwtLib.secretKey, (err, user) => {
    userLogin = user.user_id;
  });

  const {
    username,
    password,
    name,
    role,
    status,
    email,
    phone,
    date_of_birth,
    gender,
  } = req.body;
  try {
    const dataUser = {
      username: username,
      password: password,
      name: name,
      role: role,
      status: status,
      email: email,
      phone: phone,
      insert_date: new Date(),
      update_date: new Date(),
      insert_user: userLogin,
      update_user: userLogin,
      date_of_birth: date_of_birth,
      gender: gender,
    };
    // console.log(dataUser);
    const dataUserAdded = await addUser(dataUser);

    const response = {
      statusCode: dataUserAdded.statusCode,
      status: dataUserAdded.status,
      message: dataUserAdded.message,
      transactioId: log.TransactionID,
      data: dataUserAdded.data,
    };

    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataUserAdded.statusCode).json(response);
  } catch (error) {
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response500,
      flag: "ERROR",
      message: error.message,
    });
    response500.transactioId = log.TransactionID;
    res.status(500).json(response500);
  }
};
// update User
exports.updateUser = async (req, res) => {
  const log = logger.loggerData({ req });
  const token = req.headers["authorization"];
  const validToken = token.split(" ");
  let userLogin;
  jwtLib.jwt.verify(validToken[1], jwtLib.secretKey, (err, user) => {
    userLogin = user.user_id;
  });
  // console.log(userLogin);
  const {
    id,
    username,
    password,
    name,
    role,
    status,
    email,
    phone,
    date_of_birth,
    gender,
  } = req.body;
  try {
    const dataUser = {
      username: username,
      password: password,
      name: name,
      role: role,
      status: status,
      email: email,
      phone: phone,
      update_date: new Date(),
      update_user: userLogin,
      date_of_birth: date_of_birth,
      gender: gender,
    };
    // console.log(dataUser);
    const dataUserUpdated = await updateUser(id, dataUser);

    const response = {
      statusCode: dataUserUpdated.statusCode,
      status: dataUserUpdated.status,
      message: dataUserUpdated.message,
      transactioId: log.TransactionID,
      data: dataUserUpdated.data,
    };

    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response,
      flag: "STOP",
      message: response.message,
    });
    res.status(dataUserUpdated.statusCode).json(response);
  } catch (error) {
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response500,
      flag: "ERROR",
      message: error.message,
    });
    response500.transactioId = log.TransactionID;
    res.status(500).json(response500);
  }
};

//delete User by id User
exports.deleteUser = async (req, res) => {
  const log = logger.loggerData({ req });
  const id = req.params.id;
  if (id) {
    try {
      const dataUserDeleted = await deleteUser(id);

      const response = {
        statusCode: dataUserDeleted.statusCode,
        status: dataUserDeleted.status,
        message: dataUserDeleted.message,
        transactioId: log.TransactionID,
        data: dataUserDeleted.data,
      };

      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response,
        flag: "STOP",
        message: response.message,
      });
      res.status(dataUserDeleted.statusCode).json(response);
    } catch (error) {
      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response500,
        flag: "ERROR",
        message: error.message,
      });
      response500.transactioId = log.TransactionID;
      res.status(500).json(response500);
    }
  } else {
    logger.loggerData({
      timeStart: log.TimeStamp,
      req,
      result: response400,
      flag: "ERROR",
      message: response400.message,
    });
    response400.transactioId = log.TransactionID;
    res.status(400).json(response400);
  }
};
