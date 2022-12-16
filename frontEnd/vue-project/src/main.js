import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import './assets/main.css'
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.css"

import styles from "./assets/styles.css"

const app = createApp(App)

app.use(bootstrap)
app.use(styles)

app.use(router)

app.mount('#app')
