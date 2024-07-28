const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue') },
      { path: '/settings', component: () => import('pages/SettingsPage.vue')}
    ]
  },
  {
    path: '/login',
    children: [
      { path: '', component: () => import('pages/LoginPage.vue')}
    ]
  },
  {
    path: '/forgot-password',
    children: [
      { path: '', component: () => import('pages/ForgotPassword.vue')}
    ]
  },
  {
    path: '/register',
    component: () => import('pages/RegisterPage.vue'),
  },
  {
    path: '/grocery-list/:id/:name',
    component: () => import('layouts/GroceryLayout.vue'),
    children: [
      { path: '', component: () => import('pages/GroceryList.vue') },
    ]
  },

  // Always leave this as the last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
