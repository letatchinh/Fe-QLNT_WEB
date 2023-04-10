function path(root, sublink) {
    return `${root}${sublink}`;
  }

const ROOTS = {
    auth: '/',
    app: ''
  };
export const PATH_APP = {  
    main: {
      dashboard: path(ROOTS.app, '/'),
    },
  
    rooms: {
      root:path(ROOTS.app,'/rooms'),
      create:path(ROOTS.app,'/rooms/create'),
      charge:path(ROOTS.app,'/rooms/charge'),
      update:path(ROOTS.app,'/rooms/update'),
    },
  
  
  };