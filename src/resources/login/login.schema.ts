import loginHandlerRouters from './login.controller';

const loginUser = {
    type: 'object',
    required: ['login', 'password'],
    properties: {
      login: { type: 'string' },
      password: { type: 'string' },
    },
  };

const loginOpts = {
    shema: {
      body: loginUser,
      response: {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
        },
      },
    },
    handler: loginHandlerRouters
};

export default loginOpts;