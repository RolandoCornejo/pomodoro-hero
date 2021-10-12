// Inside vue.config.js
module.exports = {
    // ...other vue-cli plugin options...
    pwa: {
        manifestOptions: {
            name: "Pomodoro Hero",
            short_name: "Pomodoro Hero",
            start_url: "./",
            display: "standalone",
            background_color: "#dad267",
        },
        name: "Pomodoro Hero",
        themeColor: "#dad267",
        msTileColor: '#dad267',
        appleMobileWebAppStatusBarStyle: 'black',
        start_url: ".",
        display: "standalone",

    }
}