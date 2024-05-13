const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
    ]
  },

  {
    path: '/grocery-list/:id',
    component: () => import('layouts/GroceryLayout.vue'),
    children: [
      { path: '', component: () => import('pages/GroceryList.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
