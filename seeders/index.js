/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */
const _ = require('lodash');
const User = require('../model/user');
const authConstant = require('../constants/authConstant');
const Role = require('../model/role');
const ProjectRoute = require('../model/projectRoute');
const RouteRole = require('../model/routeRole');
const UserRole = require('../model/userRole');
const { replaceAll } = require('../utils/common');

/* seeds default users */
async function seedUser () {
  try {
    let user = await User.findOne({
      'username':'Trudie88',
      'isActive':true,
      'isDeleted':false
    });
    if (!user || !user.isPasswordMatch('Y4DDULefxJcZk31') ) {
      let user = new User({
        'password':'Y4DDULefxJcZk31',
        'username':'Trudie88',
        'organizer':false,
        'admin':true,
        'role':authConstant.USER_ROLE.User
      });
      await User.create(user);
    }
    let admin = await User.findOne({
      'username':'Hector_Sanford',
      'isActive':true,
      'isDeleted':false
    });
    if (!admin || !admin.isPasswordMatch('4FNat1PAW8r9MBV') ) {
      let admin = new User({
        'password':'4FNat1PAW8r9MBV',
        'username':'Hector_Sanford',
        'organizer':true,
        'admin':true,
        'role':authConstant.USER_ROLE.Admin
      });
      await User.create(admin);
    }
    console.info('Users seeded 🍺');
  } catch (error){
    console.log('User seeder failed.');
  }
}
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'User', 'Admin', 'System_User' ];
    for (let i = 0; i < roles.length; i++) {
      let result = await Role.findOne({
        name: roles[i],
        code: roles[i].toUpperCase() 
      });
      if (!result) {
        await Role.create({
          name: roles[i],
          code: roles[i].toUpperCase(),
          weight: 1
        });
      }
    };
    console.info('Role model seeded 🍺');
  } catch (error){
    console.log('Role seeder failed.');
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes && routes.length) {
      for (let i = 0; i < routes.length; i++) {
        const routeMethods = routes[i].methods;
        for (let j = 0; j < routeMethods.length; j++) {
          const routeObj = {
            uri: routes[i].path.toLowerCase(),
            method: routeMethods[j],
            route_name: `${replaceAll((routes[i].path).toLowerCase().substring(1), '/', '_')}`
          };
          if (routeObj.route_name){
            let result = await ProjectRoute.findOne(routeObj);
            if (!result) {
              await ProjectRoute.create(routeObj);
            }
          }
        }
      }
      console.info('ProjectRoute model seeded 🍺');
    }
  } catch (error){
    console.log('ProjectRoute seeder failed.');
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/comment/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/comment/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/comment/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/comment/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/comment/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/comment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/comment/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/comment/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/comment/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/comment/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/comment/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/comment/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/comment/:id',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/comment/:id',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/comment/:id',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/comment/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/comment/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/comment/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/comment/aggregate',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/comment/aggregate',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/comment/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/comment/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/comment/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/comment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/comment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/comment/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/comment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/comment/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/comment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/comment/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/comment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/comment/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/comment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/comment/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/comment/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/comment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/event/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/event/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/event/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/event/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/event/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/event/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/event/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/event/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/event/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/event/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/event/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/event/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/event/:id',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/event/:id',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/event/:id',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/event/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/event/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/event/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/event/aggregate',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/event/aggregate',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/event/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/event/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/event/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/event/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/event/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/event/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/event/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/event/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/event/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/event/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/event/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/event/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/event/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/event/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/event/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/event/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/event/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/event/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/event/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/event/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/event/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/event/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/aggregate',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/aggregate',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/aggregate',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/eventcategories/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/eventcategories/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/eventcategories/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/eventcategories/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/eventcategories/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/eventcategories/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/eventcategories/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/eventcategories/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/eventcategories/:id',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/eventcategories/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/eventcategories/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/eventcategories/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/eventcategories/aggregate',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/eventcategories/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/eventcategories/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/eventcategories/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/eventcategories/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/eventcategories/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/eventcategories/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/eventcategories/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/eventcategories/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/eventcategories/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/eventcategories/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/eventcategories/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/eventcategories/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/eventcategories/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/eventcategories/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/eventcategories/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/aggregate',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/create',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/addbulk',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/comment/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/comment/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/comment/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/comment/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/comment/:id',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/comment/:id',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/comment/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/comment/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/aggregate',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/aggregate',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/comment/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/comment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/comment/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/event/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/event/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/event/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/event/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/event/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/event/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/event/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/event/:id',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/event/:id',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/event/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/event/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/event/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/aggregate',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/aggregate',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/event/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/event/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/event/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/event/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/event/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/aggregate',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/aggregate',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventcategories/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventcategories/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventcategories/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventcategories/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventcategories/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventcategories/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventcategories/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/eventcategories/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/eventcategories/:id',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventcategories/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventcategories/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventcategories/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventcategories/aggregate',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventcategories/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventcategories/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/eventcategories/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/eventcategories/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/eventcategories/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/eventcategories/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/eventcategories/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/eventcategories/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/eventcategories/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/eventcategories/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/eventcategories/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/eventcategories/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/eventcategories/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/eventcategories/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/eventcategories/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/aggregate',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      for (let i = 0; i < routeRoles.length; i++) {
        let route = await ProjectRoute.findOne({
          uri: routeRoles[i].route.toLowerCase(),
          method: routeRoles[i].method,
          isActive: true,
          isDeleted: false 
        }, { id: 1 });
        let role = await Role.findOne({
          code: (routeRoles[i].role).toUpperCase(),
          isActive: true,
          isDeleted: false 
        }, { id: 1 });
        if (route && route.id && role && role.id) {
          let routeRoleObj = await RouteRole.findOne({
            roleId: role.id,
            routeId: route.id
          });
          if (!routeRoleObj) {
            await RouteRole.create({
              roleId: role.id,
              routeId: route.id
            });
          }
        }
      };
      console.info('RouteRole model seeded 🍺');
    }
  } catch (error){
    console.log('RouteRole seeder failed.');
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    let user = await User.findOne({
      'username':'Trudie88',
      'isActive':true,
      'isDeleted':false
    });
    let userRole = await Role.findOne({ code: 'SYSTEM_USER' }, { id: 1 });
    if (user && user.isPasswordMatch('Y4DDULefxJcZk31') && userRole){
      let count = await UserRole.countDocuments({
        userId: user.id,
        roleId: userRole.id
      });
      if (count == 0) {
        await UserRole.create({
          userId: user.id,
          roleId: userRole.id 
        });
        console.info('user seeded 🍺');
      }   
    }
    let admin = await User.findOne({
      'username':'Hector_Sanford',
      'isActive':true,
      'isDeleted':false
    });
    let adminRole = await Role.findOne({ code: 'SYSTEM_USER' }, { id: 1 });
    if (admin && admin.isPasswordMatch('4FNat1PAW8r9MBV') && adminRole){
      let count = await UserRole.countDocuments({
        userId: admin.id,
        roleId: adminRole.id
      });
      if (count == 0) {
        await UserRole.create({
          userId: admin.id,
          roleId: adminRole.id 
        });
        console.info('admin seeded 🍺');
      }   
    }
  } catch (error){
    console.log('UserRole seeder failed.');
  }
}

async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
};
module.exports = seedData;