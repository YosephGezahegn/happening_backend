/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Comment = require('../model/Comment');
let EventCategories = require('../model/EventCategories');
let Event = require('../model/Event');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteComment = async (filter) =>{
  try {
    return await Comment.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEventCategories = async (filter) =>{
  try {
    let eventcategories = await EventCategories.find(filter, { _id:1 });
    if (eventcategories.length){
      eventcategories = eventcategories.map((obj) => obj._id);
      const EventFilter6632 = { 'eventCategory': { '$in': eventcategories } };
      const Event4742 = await deleteEvent(EventFilter6632);
      return await EventCategories.deleteMany(filter);
    } else {
      return 'No EventCategories found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEvent = async (filter) =>{
  try {
    let event = await Event.find(filter, { _id:1 });
    if (event.length){
      event = event.map((obj) => obj._id);
      const CommentFilter5358 = { 'parentItem': { '$in': event } };
      const Comment3713 = await deleteComment(CommentFilter5358);
      return await Event.deleteMany(filter);
    } else {
      return 'No Event found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const CommentFilter7013 = { 'updatedBy': { '$in': user } };
      const Comment5725 = await deleteComment(CommentFilter7013);
      const CommentFilter2188 = { 'addedBy': { '$in': user } };
      const Comment4997 = await deleteComment(CommentFilter2188);
      const EventCategoriesFilter5760 = { 'addedBy': { '$in': user } };
      const EventCategories8857 = await deleteEventCategories(EventCategoriesFilter5760);
      const EventCategoriesFilter2947 = { 'updatedBy': { '$in': user } };
      const EventCategories1393 = await deleteEventCategories(EventCategoriesFilter2947);
      const EventFilter0781 = { 'updatedBy': { '$in': user } };
      const Event5334 = await deleteEvent(EventFilter0781);
      const EventFilter9442 = { 'addedBy': { '$in': user } };
      const Event3365 = await deleteEvent(EventFilter9442);
      const userFilter4169 = { 'addedBy': { '$in': user } };
      const user2829 = await deleteUser(userFilter4169);
      const userFilter3936 = { 'updatedBy': { '$in': user } };
      const user7740 = await deleteUser(userFilter3936);
      const userTokensFilter4807 = { 'userId': { '$in': user } };
      const userTokens6087 = await deleteUserTokens(userTokensFilter4807);
      const userRoleFilter2199 = { 'userId': { '$in': user } };
      const userRole0752 = await deleteUserRole(userRoleFilter2199);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    return await UserTokens.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter0989 = { 'roleId': { '$in': role } };
      const routeRole0504 = await deleteRouteRole(routeRoleFilter0989);
      const userRoleFilter6475 = { 'roleId': { '$in': role } };
      const userRole0223 = await deleteUserRole(userRoleFilter6475);
      return await Role.deleteMany(filter);
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter7679 = { 'routeId': { '$in': projectroute } };
      const routeRole5401 = await deleteRouteRole(routeRoleFilter7679);
      return await ProjectRoute.deleteMany(filter);
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countComment = async (filter) =>{
  try {
        
    const CommentCnt =  await Comment.countDocuments(filter);
    return { Comment : CommentCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countEventCategories = async (filter) =>{
  try {
        
    let eventcategories = await EventCategories.find(filter, { _id:1 });
    if (eventcategories.length){
      eventcategories = eventcategories.map((obj) => obj._id);

      const EventFilter = { '$or': [{                    eventCategory : { '$in' : eventcategories } }] };
      const EventCnt =  await dbService.countDocument(Event,EventFilter);

      let response = { Event : EventCnt, };
      return response;
    } else {
      return {  eventcategories : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countEvent = async (filter) =>{
  try {
        
    let event = await Event.find(filter, { _id:1 });
    if (event.length){
      event = event.map((obj) => obj._id);

      const CommentFilter = { '$or': [{                    parentItem : { '$in' : event } }] };
      const CommentCnt =  await dbService.countDocument(Comment,CommentFilter);

      let response = { Comment : CommentCnt, };
      return response;
    } else {
      return {  event : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
        
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);

      const CommentFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const CommentCnt =  await dbService.countDocument(Comment,CommentFilter);

      const EventCategoriesFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const EventCategoriesCnt =  await dbService.countDocument(EventCategories,EventCategoriesFilter);

      const EventFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const EventCnt =  await dbService.countDocument(Event,EventFilter);

      const userFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userCnt =  await dbService.countDocument(User,userFilter);

      const userTokensFilter = { '$or': [{                    userId : { '$in' : user } }] };
      const userTokensCnt =  await dbService.countDocument(UserTokens,userTokensFilter);

      const userRoleFilter = { '$or': [{                    userId : { '$in' : user } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        Comment : CommentCnt,
        EventCategories : EventCategoriesCnt,
        Event : EventCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
        
    const userTokensCnt =  await UserTokens.countDocuments(filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
        
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
        
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    routeId : { '$in' : projectroute } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
        
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
        
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteComment = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Comment.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEventCategories = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let eventcategories = await EventCategories.find(filter, { _id:1 });
    if (eventcategories.length){
      eventcategories = eventcategories.map((obj) => obj._id);
      const EventFilter4539 = { 'eventCategory': { '$in': eventcategories } };
      const Event6395 = await softDeleteEvent(EventFilter4539, updateBody);
      return await EventCategories.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No EventCategories found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEvent = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let event = await Event.find(filter, { _id:1 });
    if (event.length){
      event = event.map((obj) => obj._id);
      const CommentFilter0862 = { 'parentItem': { '$in': event } };
      const Comment5680 = await softDeleteComment(CommentFilter0862, updateBody);
      return await Event.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No Event found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const CommentFilter0673 = { 'updatedBy': { '$in': user } };
      const Comment4606 = await softDeleteComment(CommentFilter0673, updateBody);
      const CommentFilter9384 = { 'addedBy': { '$in': user } };
      const Comment0064 = await softDeleteComment(CommentFilter9384, updateBody);
      const EventCategoriesFilter7409 = { 'addedBy': { '$in': user } };
      const EventCategories9778 = await softDeleteEventCategories(EventCategoriesFilter7409, updateBody);
      const EventCategoriesFilter9665 = { 'updatedBy': { '$in': user } };
      const EventCategories2039 = await softDeleteEventCategories(EventCategoriesFilter9665, updateBody);
      const EventFilter0997 = { 'updatedBy': { '$in': user } };
      const Event3992 = await softDeleteEvent(EventFilter0997, updateBody);
      const EventFilter4727 = { 'addedBy': { '$in': user } };
      const Event6113 = await softDeleteEvent(EventFilter4727, updateBody);
      const userFilter4284 = { 'addedBy': { '$in': user } };
      const user6600 = await softDeleteUser(userFilter4284, updateBody);
      const userFilter9149 = { 'updatedBy': { '$in': user } };
      const user8153 = await softDeleteUser(userFilter9149, updateBody);
      const userTokensFilter2429 = { 'userId': { '$in': user } };
      const userTokens5251 = await softDeleteUserTokens(userTokensFilter2429, updateBody);
      const userRoleFilter7310 = { 'userId': { '$in': user } };
      const userRole4762 = await softDeleteUserRole(userRoleFilter7310, updateBody);
      return await User.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserTokens.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter5403 = { 'roleId': { '$in': role } };
      const routeRole3945 = await softDeleteRouteRole(routeRoleFilter5403, updateBody);
      const userRoleFilter6880 = { 'roleId': { '$in': role } };
      const userRole2575 = await softDeleteUserRole(userRoleFilter6880, updateBody);
      return await Role.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter5393 = { 'routeId': { '$in': projectroute } };
      const routeRole0890 = await softDeleteRouteRole(routeRoleFilter5393, updateBody);
      return await ProjectRoute.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await RouteRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteComment,
  deleteEventCategories,
  deleteEvent,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countComment,
  countEventCategories,
  countEvent,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteComment,
  softDeleteEventCategories,
  softDeleteEvent,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
