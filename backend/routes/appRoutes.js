const { Router } = require('express')
const taskController = require('../controllers/taskController')
const userController = require('../controllers/userController')
const router = Router()

router.get('/list', taskController.getList)
router.post('/create', taskController.createTask)
router.put('/update', taskController.updateTask)
router.delete('/delete/:id', taskController.deleteTask)
// Authentication
router.post('/signup', userController.signup)
router.post('/login', userController.login)

module.exports = router;