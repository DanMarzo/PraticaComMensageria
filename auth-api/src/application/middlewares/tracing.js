import { v4 as uuidV4 } from "uuid";
import { BAD_REQUEST } from "../constants/httpStatus.js";

export default (req, res, next) => {
  const { transactionid } = req.headers;
  if (!transactionid) {
    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      message: "The transaction Id header is required",
    });
  }
  req.headers.serviceid = uuidV4();
  return next();
};
