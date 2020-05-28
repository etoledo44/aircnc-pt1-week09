//Importando dependencias
const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')

//Controllers
const SessionController = require('./controllers/SessionController')
const SpotController = require('./controllers/SpotController')
const DashboardController = require('./controllers/DashboardController')
const BookingController = require('./controllers/BookingController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')

//Configs
const routes = express.Router()
const upload = multer(uploadConfig) /* multer vai permitir o upload de arquivo atraves da rota */

//Rotas
routes.post('/sessions', SessionController.store)
routes.get('/spots', SpotController.index)
routes.post('/spots', upload.single('thumbnail'), SpotController.store)
routes.post('/spots/:spot_id/booking', BookingController.store)
routes.post('/bookings/:booking_id/approvals', ApprovalController.store)
routes.post('/bookings/:booking_id/rejections', RejectionController.store)
routes.get('/dashboard', DashboardController.show)

module.exports = routes
