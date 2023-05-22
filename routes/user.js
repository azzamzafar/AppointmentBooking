const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js')

router.post('',userController.postAddUser)

router.get('',userController.getUserList)

router.get('/:userId',userController.getSingleUser)

// edit user
router.put('/:userId',userController.updateUser)

// delete
router.delete('/:userId',userController.deleteUser)

module.exports = router;