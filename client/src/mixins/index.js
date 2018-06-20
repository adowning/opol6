/* eslint no-unused-vars disable */
import Vue from 'vue'
import { mapGetters } from 'vuex'
Vue.mixin({
    computed: {
        ...mapGetters({
            $_AuthUser: 'auth/getUser',
            $_isAuthenticated: 'auth/isAuthenticated',
            $_userVerification: 'auth/userVerification'
        })
    },
    methods: {
        fireNotify: function(msg, group, type) {
            this.$notify({
                group: group || 'all',
                title: 'Authentication',
                type: type || '',
                text: msg || '',
                width: '100%'
            })
        }
    }
})

function createContext(id, seed) {
    let data = seed || {}
    let obj = seed || {}
    obj.get = function get(key) {
        return util.getMessageProperty(data, key)
    }
    obj.set = function set(key, value) {
        util.setMessageProperty(data, key, value)
    }
    obj.getKeys = function() {
        return Object.getOwnPropertyNames(data)
    }
    obj.getKeys = function() {
        return Object.getOwnPropertyNames(data)
    }

    return obj
}
