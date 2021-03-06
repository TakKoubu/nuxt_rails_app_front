export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    // server: {
    //   port: 3000, 
    // },
    head: {
        title: 'frontend',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ["~plugins/core-components.js"],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        '@nuxtjs/proxy'
    ],
    auth: {
        redirect: {
            login: '/login', // 未ログイン時に認証が必要なページにアクセスした際のリダイレクトURL
            logout: '/login', // ログアウト時のリダイレクトURL
            callback: '/callback', // Oauth認証等で必要となる コールバックルート
            home: '/memo', // ログイン後のリダイレクトURL
        },
        strategies: {
            local: {
                endpoints: {
                    login: { url: 'http://localhost:5000/api/login', method: 'post', propertyName: 'jwt' },
                    user: false,
                    logout: false,
                }
            },
        }
    },
    proxy: {
        '/api/': {
            target: 'http://localhost:5000',
            pathRewrite: { '^/api/': '/api' },
            changeOrigin: true
        }
    },
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: 'http://localhost:5000',
        proxy: true
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    buildModules: [
        // Simple usage
        '@nuxtjs/vuetify',

        // With options
        ['@nuxtjs/vuetify', { /* module options */ }]
    ],
}