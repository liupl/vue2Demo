import App from '../App.vue'
export default [{
    path: '/',
    children: [{
            path: 'home',
            meta: { auth: false },
            component: resolve => require(['../components/home/home.vue'], resolve)
        },
        {
            path: '*',
            redirect: 'home'
        }
    ]
}]