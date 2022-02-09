/**
 * EventCategoriesRoutes.js
 * @description :: CRUD API routes for EventCategories
 */

const express = require('express');
const router = express.Router();
const EventCategoriesController = require('../../../controller/device/v1/EventCategoriesController');
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/eventcategories/create').post(auth(...[ 'createByUserInDevicePlatform' ]),checkRolePermission,EventCategoriesController.addEventCategories);
router.route('/device/api/v1/eventcategories/list').post(auth(...[ 'getAllByUserInDevicePlatform' ]),checkRolePermission,EventCategoriesController.findAllEventCategories);
router.route('/device/api/v1/eventcategories/count').post(auth(...[ 'getCountByUserInDevicePlatform' ]),checkRolePermission,EventCategoriesController.getEventCategoriesCount);
router.route('/device/api/v1/eventcategories/aggregate').post(auth(...[ 'aggregateByUserInDevicePlatform' ]),checkRolePermission,EventCategoriesController.getEventCategoriesByAggregate);
router.route('/device/api/v1/eventcategories/softDeleteMany').put(auth(...[ 'softDeleteManyByUserInDevicePlatform' ]),checkRolePermission,EventCategoriesController.softDeleteManyEventCategories);
router.route('/device/api/v1/eventcategories/addBulk').post(auth(...[ 'addBulkByUserInDevicePlatform' ]),checkRolePermission,EventCategoriesController.bulkInsertEventCategories);
router.route('/device/api/v1/eventcategories/updateBulk').put(auth(...[ 'updateBulkByUserInDevicePlatform' ]),checkRolePermission,EventCategoriesController.bulkUpdateEventCategories);
router.route('/device/api/v1/eventcategories/deleteMany').post(auth(...[ 'deleteManyByUserInDevicePlatform' ]),checkRolePermission,EventCategoriesController.deleteManyEventCategories);
router.route('/device/api/v1/eventcategories/softDelete/:id').put(auth(...[ 'softDeleteByUserInDevicePlatform' ]),checkRolePermission,EventCategoriesController.softDeleteEventCategories);
router.route('/device/api/v1/eventcategories/partial-update/:id').put(auth(...[ 'partialUpdateByUserInDevicePlatform' ]),checkRolePermission,EventCategoriesController.partialUpdateEventCategories);
router.route('/device/api/v1/eventcategories/update/:id').put(auth(...[ 'updateByUserInDevicePlatform' ]),checkRolePermission,EventCategoriesController.updateEventCategories);    
router.route('/device/api/v1/eventcategories/:id').get(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,EventCategoriesController.getEventCategories);
router.route('/device/api/v1/eventcategories/:id').post(auth(...[ 'getByUserInDevicePlatform' ]),checkRolePermission,EventCategoriesController.getEventCategories);
router.route('/device/api/v1/eventcategories/delete/:id').delete(auth(...[ 'deleteByUserInDevicePlatform' ]),checkRolePermission,EventCategoriesController.deleteEventCategories);

module.exports = router;
