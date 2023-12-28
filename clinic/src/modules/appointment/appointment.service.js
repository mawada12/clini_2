const AppError = require("../../utils/AppError");
const Appointment = require("./appointment.model");
const User = require("../user/user.model");
const asyncHandler = require("express-async-handler");

exports.createDoctorAppointment = asyncHandler(async (req, res, next) => {
  let appointment = await Appointment.findOne({
    where: {
      date: req.body.date,
      time: req.body.time
    }
  });
  if (appointment) {
    return next(new AppError("appointment already exist!", 400));
  }
  appointment = await Appointment.create({ ...req.body });
  return res.status(201).json({ appointment });
});

exports.getDoctorAppointments = asyncHandler(async (req, res, next) => {
  const doctorId = req.headers.doctor;
  let doctor = await User.findOne({ where: { id: doctorId } });
  if (!doctor) {
    return next(new AppError("doctor not found", 404));
  }
  const appointments = await Appointment.findAll({
    where: {
      doctorId: doctorId
    }
  });
  return res.status(200).json({ appointments });
});

exports.getDoctorAppointment = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  const appointment = await Appointment.findOne({
    where: { id: req.params.id }
  });
  if (!appointment) {
    return next(new AppError("appointment not found", 404));
  }
  return res.status(200).json({ appointment });
});

exports.deleteDoctorAppointment = asyncHandler(async (req, res, next) => {
  let appointment = await Appointment.findOne({ where: { id: req.params.id } });
  if (!appointment) {
    return next(new AppError("appointment not found", 404));
  }
  await appointment.destroy();
  return res.status(204).end();
});

exports.updateDoctorAppointment = asyncHandler(async (req, res, next) => {
  // Find the appointment by ID
  let appointment = await Appointment.findOne({ where: { id: req.params.id } });
  // Check if the appointment exists
  if (!appointment) {
    return next(new AppError("Appointment not found", 404));
  }
  // Update the appointment with the new data from the request body
  appointment.date = req.body.date || appointment.date;
  appointment.time = req.body.time || appointment.time;
  // Save the updated appointment
  appointment = await appointment.save();
  // Respond with the updated appointment
  return res.status(200).json({ appointment });
});

exports.getAvailableAppointments = asyncHandler(async (req, res, next) => {
  const appointments = await Appointment.findAll({
    where: {
      is_reserved: false,
      doctorId: req.params.doctorId
    }
  });
  if (!appointments) {
    return next(new AppError("no available appointments", 404));
  }
  return res.status(200).json(appointments);
});

exports.bookAndCancelAppointment = asyncHandler(async (req, res, next) => {
  let appointment = await Appointment.findOne({
    where: {
      id: req.body.appointmentId
    }
  });
  if (!appointment) {
    return next(new AppError("no available appointments", 404));
  }
  if (appointment.is_reserved && req.body.patientId) {
    return next(new AppError("no available appointments", 404));
  }
  if (req.body.patientId) {
    appointment.patientId = req.body.patientId;
    appointment.is_reserved = true;
  } else {
    appointment.is_reserved = false;
    appointment.patientId = null;
  }
  appointment = await appointment.save();
  return res.status(200).json(appointment);
});
