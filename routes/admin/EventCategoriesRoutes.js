/**
 * EventCategoriesRoutes.js
 * @description :: CRUD API routes for EventCategories
 */

const express = require('express');
const router = express.Router();
const EventCategoriesController = require('../../controller/admin/EventCategoriesController');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/eventcategories/create').post(auth(...[ 'createByAdminInAdminPlatform' ]),checkRolePermission,EventCategoriesController.addEventCategories);
router.route('/admin/eventcategories/list').post(auth(...[ 'getAllByAdminInAdminPlatform' ]),checkRolePermission,EventCategoriesController.findAllEventCategories);
router.route('/admin/eventcategories/count').post(auth(...[ 'getCountByAdminInAdminPlatform' ]),checkRolePermission,EventCategoriesController.getEventCategoriesCount);
router.route('/admin/eventcategories/aggregate').post(auth(...[ 'aggregateByAdminInAdminPlatform' ]),checkRolePermission,EventCategoriesController.getEventCategoriesByAggregate);
router.route('/admin/eventcategories/softDeleteMany').put(auth(...[ 'softDeleteManyByAdminInAdminPlatform' ]),checkRolePermission,EventCategoriesController.softDeleteManyEventCategories);
router.route('/admin/eventcategories/addBulk').post(auth(...[ 'addBulkByAdminInAdminPlatform' ]),checkRolePermission,EventCategoriesController.bulkInsertEventCategories);
router.route('/admin/eventcategories/updateBulk').put(auth(...[ 'updateBulkByAdminInAdminPlatform' ]),checkRolePermission,EventCategoriesController.bulkUpdateEventCategories);
router.route('/admin/eventcategories/deleteMany').post(auth(...[ 'deleteManyByAdminInAdminPlatform' ]),checkRolePermission,EventCategoriesController.deleteManyEventCategories);
router.route('/admin/eventcategories/softDelete/:id').put(auth(...[ 'softDeleteByAdminInAdminPlatform' ]),checkRolePermission,EventCategoriesController.softDeleteEventCategories);
router.route('/admin/eventcategories/partial-update/:id').put(auth(...[ 'partialUpdateByAdminInAdminPlatform' ]),checkRolePermission,EventCategoriesController.partialUpdateEventCategories);
router.route('/admin/eventcategories/update/:id').put(auth(...[ 'updateByAdminInAdminPlatform' ]),checkRolePermission,EventCategoriesController.updateEventCategories);    
router.route('/admin/eventcategories/:id').get(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,EventCategoriesController.getEventCategories);
router.route('/admin/eventcategories/:id').post(auth(...[ 'getByAdminInAdminPlatform' ]),checkRolePermission,EventCategoriesController.getEventCategories);
router.route('/admin/eventcategories/delete/:id').delete(auth(...[ 'deleteByAdminInAdminPlatform' ]),checkRolePermission,EventCategoriesController.deleteEventCategories);

module.exports = router;
