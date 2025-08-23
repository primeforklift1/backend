const jwtLib = require("../config/jwt");
const crypto = require("crypto");
require("dotenv").config();

const logger = require("../config/logger");

const {
  menu,
  byMenu,
  byMenuWhere,
  addMenu,
  updateMenu,
  deleteMenu,
} = require("../models/modelMenu");

const response500 = {
  status: "Error",
  message: "Internal Server Error!",
};
const response400 = {
  status: "Error",
  message: "Bad Request!",
};

exports.menu = async (req, res) => {
    const log = logger.loggerData({ req });

    try {
        // Ambil parameter page dan row_count dari query string
        const page = req.query.page;
        const rowCount = req.query.row_count;

        const dataMenu = await menu(page, rowCount);

        const response = {
            statusCode: dataMenu.statusCode,
            status: dataMenu.status,
            message: dataMenu.message,
            transactioId: log.TransactionID,
            totalData: dataMenu.totalData,
            data: dataMenu.data,
        };
        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataMenu.statusCode).json(response);
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

// menu by id
exports.byMenu = async (req, res) => {
    const log = logger.loggerData({ req });
    const id = req.params.id;
    if (id) {
        try {
            const dataMenu = await byMenu(id);

            const response = {
                statusCode: dataMenu.statusCode,
                status: dataMenu.status,
                message: dataMenu.message,
                transactionId: log.TransactionID,
                data: dataMenu.data,
            };
            logger.loggerData({
                timeStart: log.TimeStamp,
                req,
                result: response,
                flag: "STOP",
                message: response.message,
            });
            res.status(dataMenu.statusCode).json(response);
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
// Menu by where
exports.byMenuWhere = async (req, res) => {
    const log = logger.loggerData({ req });
    const { id, group_s, lang, status } = req.body;
    // Ambil parameter page dan row_count dari query string
    const page = req.query.page;
    const rowCount = req.query.row_count;
    try {
      let whereClause = {};
    //   whereClause.lang = 'id';
      // Cek jika parameter id
      if (id) {
        whereClause.id = id;
      }
      // Cek jika parameter lang
      if (lang) {
        whereClause.lang = lang;
      }
      if (group_s) {
        whereClause.group_s = group_s;
      }
      // Cek jika parameter status_aktif
      if (status) {
        whereClause.status = status;
      }
      const databyMenuWhere = await byMenuWhere(whereClause, page, rowCount);

      let parent = [];
      let child = [];
      for(let i=0;i<databyMenuWhere.data.length;i++){
        if(databyMenuWhere.data[i].parent == null){
            parent.push(databyMenuWhere.data[i]);
        }else{
            child.push(databyMenuWhere.data[i]);
        }
      }

      parent.sort((a, b) => a.order - b.order);
      child.sort((a, b) => a.order - b.order);

      let menuStructure = [];

      for(let j=0;j<parent.length;j++){
        let appendChild = [];
        for(let k=0;k<child.length;k++){
            if(parent[j].id == child[k].parent){
                appendChild.push(child[k]);
            }
        }
        menuStructure[j] = {
            ...parent[j].toJSON(),
            child : appendChild
        }

      }
  
      const response = {
        statusCode: databyMenuWhere.statusCode,
        status: databyMenuWhere.status,
        message: databyMenuWhere.message,
        transactionId: log.TransactionID,
        totalData: databyMenuWhere.totalData,
        data: menuStructure,
      };
      logger.loggerData({
        timeStart: log.TimeStamp,
        req,
        result: response,
        flag: "STOP",
        message: response.message,
      });
      res.status(databyMenuWhere.statusCode).json(response);
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

  // Menu by where
  exports.byMenuWhereAll = async (req, res) => {
      const log = logger.loggerData({ req });
      const { id, group_s, lang, status, menu_type } = req.body;
      // Ambil parameter page dan row_count dari query string
      const page = req.query.page;
      const rowCount = req.query.row_count;
      try {
          let whereClause = {};
          //   whereClause.lang = 'id';
          // Cek jika parameter id
          if (id) {
              whereClause.id = id;
          }
          if (lang) {
              whereClause.lang = lang;
          }

          if (group_s) {
              whereClause.group_s = group_s;
          }
          // Cek jika parameter status_aktif
          if (status) {
              whereClause.status = status;
          }
          // Cek jika parameter menu_type
          if (menu_type) {
              whereClause.menu_type = menu_type;
          }
          const databyMenuWhere = await byMenuWhere(whereClause, page, rowCount);
  
          const response = {
              statusCode: databyMenuWhere.statusCode,
              status: databyMenuWhere.status,
              message: databyMenuWhere.message,
              transactionId: log.TransactionID,
              totalData: databyMenuWhere.totalData,
              data: databyMenuWhere.data,
          };
          logger.loggerData({
              timeStart: log.TimeStamp,
              req,
              result: response,
              flag: "STOP",
              message: response.message,
          });
          res.status(databyMenuWhere.statusCode).json(response);
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

// add Menu
exports.addMenu = async (req, res) => {
    const log = logger.loggerData({ req });
    const token = req.headers["authorization"];
    const validToken = token.split(" ");
    let userLogin;
    jwtLib.jwt.verify(validToken[1], jwtLib.secretKey, (err, user) => {
        userLogin = user.user_id;
    });

    const {
        group_s,
        lang,
        parent,
        order,
        menu_type,
        menu_name,
        link,
        status,
    } = req.body;
    try {
        const dataMenu = {
            group_s: group_s,
            lang: lang,
            parent: parent,
            order: order,
            menu_type: menu_type,
            menu_name: menu_name,
            link: link,
            status: status,
            insert_date: new Date(),
            insert_by: userLogin
        };
        // console.log(dataMenu);
        const dataMenuAdded = await addMenu(dataMenu);

        const response = {
            statusCode: dataMenuAdded.statusCode,
            status: dataMenuAdded.status,
            message: dataMenuAdded.message,
            transactioId: log.TransactionID,
            data: dataMenuAdded.data,
        };

        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataMenuAdded.statusCode).json(response);
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
// update Menu
exports.updateMenu = async (req, res) => {
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
        group_s,
        lang,
        parent,
        order,
        menu_type,
        menu_name,
        link,
        status,
    } = req.body;
    try {
        const dataMenu = {
          group_s: group_s,
          lang: lang,
          parent: parent,
          order: order,
          menu_type: menu_type,
          menu_name: menu_name,
          link: link,
          status: status,
        };
        // console.log(dataMenu);
        const dataMenuUpdated = await updateMenu(id, dataMenu);

        const response = {
            statusCode: dataMenuUpdated.statusCode,
            status: dataMenuUpdated.status,
            message: dataMenuUpdated.message,
            transactioId: log.TransactionID,
            data: dataMenuUpdated.data,
        };

        logger.loggerData({
            timeStart: log.TimeStamp,
            req,
            result: response,
            flag: "STOP",
            message: response.message,
        });
        res.status(dataMenuUpdated.statusCode).json(response);
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

//delete Menu by id Menu
exports.deleteMenu = async (req, res) => {
    const log = logger.loggerData({ req });
    const id = req.params.id;
    if (id) {
        try {
            const dataMenuDeleted = await deleteMenu(id);

            const response = {
                statusCode: dataMenuDeleted.statusCode,
                status: dataMenuDeleted.status,
                message: dataMenuDeleted.message,
                transactioId: log.TransactionID,
                data: dataMenuDeleted.data,
            };

            logger.loggerData({
                timeStart: log.TimeStamp,
                req,
                result: response,
                flag: "STOP",
                message: response.message,
            });
            res.status(dataMenuDeleted.statusCode).json(response);
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
