const erogame = {
  name: 'erogame',
  path: '/erogame',
  component: 'basic',
  children: [
    {
      name: 'erogame_shop',
      path: '/erogame/shop',
      component: 'self',
      meta: {
        title: '通贩站点',
        i18nTitle: 'routes.erogame.shop',
        requiresAuth: true,
        icon: 'material-symbols:shopping-cart-outline-rounded'
      }
    },
    {
      name: 'erogame_tool',
      path: '/erogame/tool',
      component: 'self',
      meta: {
        title: '工具站点',
        i18nTitle: 'routes.erogame.tool',
        requiresAuth: true,
        permissions: ['super'],
        icon: 'mdi:tools'
      }
    },
    {
      name: 'erogame_information',
      path: '/erogame/information',
      component: 'self',
      meta: {
        title: '资料站点',
        i18nTitle: 'routes.erogame.information',
        requiresAuth: true,
        permissions: ['super'],
        icon: 'material-symbols:library-books-outline'
      }
    }
  ],
  meta: {
    title: '游戏本体',
    i18nTitle: 'routes.erogame._value',
    icon: 'solar:gamepad-minimalistic-outline',
    order: 11
  }
};

export default erogame;
