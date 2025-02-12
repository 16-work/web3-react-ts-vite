export const IDL = {
  address: '',
  metadata: {
    name: '',
    version: '',
    spec: '',
    description: '',
  },
  instructions: [
    {
      name: 'functionName',
      discriminator: [],
      accounts: [
        {
          name: 'accountParams1',
          writable: true,
        },
        {
          name: 'accountParams2',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 111, 110, 102, 105, 103],
              },
            ],
          },
        },
      ],
      args: [],
    },
  ],
  accounts: [],
  events: [],
  errors: [
    {
      code: 1,
      name: '',
      msg: '',
    },
  ],
  types: [],
};
