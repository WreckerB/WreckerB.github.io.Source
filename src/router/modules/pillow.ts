const pillow = {
  name: 'pillow',
  path: '/pillow',
  component: 'basic',
  children: [
    {
      name: 'pillow_information',
      path: '/pillow/information',
      component: 'self',
      meta: {
        title: '资料站点',
        i18nTitle: 'routes.pillow.information',
        requiresAuth: true,
        permissions: ['super'],
        icon: 'material-symbols:library-books-outline'
      }
    }
  ],
  meta: {
    title: '抱枕',
    i18nTitle: 'routes.pillow._value',
    icon: 'iconoir:pillow',
    order: 12
  }
};

export default pillow;
