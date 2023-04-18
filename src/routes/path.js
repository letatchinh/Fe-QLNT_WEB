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
      login: path(ROOTS.app, '/login'),
    },
  
    rooms: {
      root:path(ROOTS.app,'/rooms'),
      create:path(ROOTS.app,'/rooms/create'),
      charge:path(ROOTS.app,'/rooms/charge'),
      update:path(ROOTS.app,'/rooms/update'),
    },
    brem: {
      create:path(ROOTS.app,'/brem/create'),
    },
    user: {
      root:path(ROOTS.app,'/user'),
      hobby:path(ROOTS.app,'/hobby'),
    },
    account:{
      root:path(ROOTS.app,'/account'),
    }
  
  
  };