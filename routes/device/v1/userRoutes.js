/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const userController = require('../../../controller/device/v1/userController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/user/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,userController.addUser);
router.route('/device/api/v1/user/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,userController.findAllUser);
router.route('/device/api/v1/user/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,userController.getUserCount);
router.route('/device/api/v1/user/aggregate').post(auth(...[ 'aggregateByUserInDevicePlatform' ]),checkRolePermission,userController.getUserByAggregate);
router.route('/device/api/v1/user/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,userController.softDeleteManyUser);
router.route('/device/api/v1/user/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,userController.bulkInsertUser);
router.route('/device/api/v1/user/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,userController.bulkUpdateUser);
router.route('/device/api/v1/user/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,userController.deleteManyUser);
router.route('/device/api/v1/user/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,userController.softDeleteUser);
router.route('/device/api/v1/user/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,userController.partialUpdateUser);
router.route('/device/api/v1/user/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,userController.updateUser);    
router.route('/device/api/v1/user/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,userController.getUser);
router.route('/device/api/v1/user/:id').post(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,userController.getUser);
router.route('/device/api/v1/user/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,userController.deleteUser);
router.route('/device/api/v1/user/change-password').put(auth(...[ 'changePasswordByUserInDevicePlatform' ]),userController.changePassword);
router.route('/device/api/v1/user/update-profile').put(auth(...[ 'updateProfileByUserInDevicePlatform' ]),userController.updateProfile);

module.exports = router;
