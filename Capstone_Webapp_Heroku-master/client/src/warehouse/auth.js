import axios from 'axios';
import router from '../router/index';

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    error: null
};

const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    error: state => state.error
};

const actions = {
    //Login user
    async login({
        commit
    }, user) {
        commit('auth_request');
        try {
            let res = await axios.post('https://broadway-exxon-auto-care.herokuapp.com/api/user/login', user)
            if (res.data.success) {
                const token = res.data.token;
                const user = res.data.user;
                //Store token into localstorage
                localStorage.setItem('token', token);
                //Set the axios defaults
                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, user);
            }
            return res;
        } catch (err) {
            commit('auth_error', err);
        }
    },
    //Register User
    async register({
        commit
    }, userData) {
        try {
            commit('register_request');
            let res = await axios.post('https://broadway-exxon-auto-care.herokuapp.com/api/user/register', userData);
            if (res.data.success !== undefined) {
                commit('register_success');
            }
            return res;
        } catch (err) {
            commit('register_error', err)
        }
    },
    //Logout user
    async logout({
        commit
    }) {
        await localStorage.removeItem('token');
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
        return
    },
    //Get user account info
    async getAccount({
        commit
    }) {
        commit('account_request');
        let res = await axios.get('https://broadway-exxon-auto-care.herokuapp.com/api/user/profile')
        commit('user_account', res.data.user)
        return res;
    }
}

const mutations = {
    auth_request(state) {
        state.error = null
        state.status = 'loading'
    },
    auth_success(state, token, user) {
        state.token = token
        state.user = user
        state.status = 'success'
        state.error = null
    },
    auth_error(state, err) {
        state.error = err.response.data.msg
    },
    register_request(state) {
        state.error = null
        state.status = 'loading'
    },
    register_success(state) {
        state.error = null
        state.status = 'success'
    },
    register_error(state, err) {
        state.error = err.response.data.msg
    },
    logout(state) {
        state.error = null
        state.status = ''
        state.token = ''
        state.user = ''
    },
    account_request(state) {
        state.status = 'loading'
    },
    user_account(state, user) {
        state.user = user
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};