import Vue from 'vue'
import Router from 'vue-router'
import Singers from './views/Singers/Home'
import NewSingers from './views/Singers/NewSingers'
import EditSingers from './views/Singers/EditSingers'
import Albums from './views/Albums/Home'
import NewAlbums from './views/Albums/NewAlbums'
import EditAlbums from './views/Albums/EditAlbums'
import Songs from './views/Songs/Home'
import NewSongs from './views/Songs/NewSongs'
import Register from './views/Register'
import Login from './views/Login'
import Img from './views/img'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/singers',
            name: 'singers',
            component: Singers
        },
        {
            path: '/singers/new',
            name: 'newsingers',
            component: NewSingers,
        },
        {
            path: '/singers/edit',
            name: 'editsingers',
            component: EditSingers,
        },
        {
            path: '/albums',
            name: 'albums',
            component: Albums
        },
        {
            path: '/albums/new',
            name: 'newalbums',
            component: NewAlbums
        },
        {
            path: '/albums/edit',
            name: 'editalbums',
            component: EditAlbums
        },
        {
            path: '/songs',
            name: 'songs',
            component: Songs
        },
        {
            path: '/songs/new',
            name: 'newsongs',
            component: NewSongs
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/img',
            name: 'img',
            component: Img
        },
    ]
})
