import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './vuex/store'
import Dashboard from './views/dashboard/dashboard'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Confirm from './components/Confirm'
import Schedule from './views/schedule/schedule'
import SignOut from './components/SignOut'
import NewPass from './components/PasswordConfirm'
import FourOhFour from './views/404'
import Profile from './views/people/profile'
import LiveView from './views/liveview/liveview'
import Hardware from './views/assets/hardware'
import Maintenance from './views/assets/maintenance'
import Consumables from './views/assets/consumables'
import TimeClocks from './views/people/timeclocks'

// import {
//   // Auth,
//   // Logger
// } from "aws-amplify";
// // const logger = new Logger("Router");

Vue.use(Router)

function loadHardware(to, from, next) {
    console.log('dispatching loadHardwares event')
    store.dispatch('assets/loadHardwares').then(() => {
        next()
    })
}
const router = new Router({
    // mode: 'history',
    routes: [ {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            loadUser: true
        }
    },
    {
        path: '/auth/signin',
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '/schedule/schedule',
        name: 'Schedule',
        component: Schedule,
        meta: {
            loadUser: true
        }
    },
    {
        path: '/liveview/liveview',
        name: 'LiveView',
        component: LiveView,
        meta: {
            loadUser: true
        }
    },
    {
        path: '/dashboard/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            loadUser: true
        }
    },
    {
        path: '/assets/maintenance',
        name: 'Maintenance',
        component: Maintenance,
        meta: {
            loadUser: true
        }
    },
    {
        path: '/assets/consumables',
        name: 'Consumables',
        component: Consumables,
        meta: {
            loadUser: true
        }
    },
    {
        path: '/assets/hardware',
        name: 'Hardware',
        component: Hardware,
        beforeEnter: loadHardware,
        meta: {
            loadUser: true
        }
    },
    {
        path: '/auth/signup',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/confirm',
        name: 'Confirm',
        component: Confirm,
        props: (route) => {
            return {
                username: route.query.username
            }
        }
    },
    {
        path: '/auth/signout',
        name: 'SignOut',
        component: SignOut
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            loadUser: true
        }
    },
    {
        path: '/timeclocks',
        name: 'TimeClocks',
        component: TimeClocks,
        meta: {
            loadUser: true
        }
    },
    {
        path: '/newpassword',
        name: 'NewPass',
        component: NewPass,

    },
    {
        path: '*',
        name: '404',
        component: FourOhFour
    }
    ]
})

// const AuthFilter = (to, from, next) => {
//   logger.info("before routing ", to, from);
//   Auth.currentAuthenticatedUser()
//     .then(user => {
//       logger.debug("...has user", user);
//       // store.commit('setUser', user)
//       store.dispatch("auth/setUser", user);
//       Auth.currentCredentials()
//         .then(credentials => {
//          store.dispatch("auth/setUserId", credentials.identityId);
//           store.dispatch('auth/loadUser').then(() => {
//             // store.dispatch('mqtt/startClient')
//           })
//         })
//         .catch(err => logger.warn("get current credentials err", err));
//       next();
//     })
//     .catch(err => {
//       logger.warn("...no user", err);
//       // store.commit('setUser', null)
//       store.dispatch("auth/setUser", null);
//       if (!to.path.startsWith("/auth")) {
//         next("/auth/signIn");
//       } else {
//         next();
//       }
//     });
// };

// router.beforeEach(AuthFilter);

export default router
