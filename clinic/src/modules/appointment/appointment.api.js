const express = require("express");
const {
  createDoctorAppointment,
  getDoctorAppointments,
  getDoctorAppointment,
  deleteDoctorAppointment,
  updateDoctorAppointment,
  getAvailableDoctors,
  getAvailableAppointments,
  bookAndCancelAppointment
} = require("./appointment.service");
const { isUser } = require("../user/user.auth");
const router = express.Router();

router
  .route("/doctor")
  .post(isUser, createDoctorAppointment)
  .get(isUser, getDoctorAppointments);

router
  .route("/doctor/:id")
  .get(isUser, getDoctorAppointment)
  .delete(isUser, deleteDoctorAppointment)
  .put(isUser, updateDoctorAppointment);

router
  .route("/available/:doctorId")
  .get(isUser, getAvailableAppointments)
  .put(isUser, bookAndCancelAppointment);

module.exports = router;
