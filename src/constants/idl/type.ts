export type IDLType = {
  address: '';
  metadata: {
    name: '';
    version: '';
    spec: '';
    description: '';
  };
  instructions: [
    {
      name: 'functionName';
      discriminator: [];
      accounts: [
        {
          name: 'accountParams1';
          writable: true;
        },
        {
          name: 'accountParams2';
          pda: {
            seeds: [
              {
                kind: 'const';
                value: [];
              },
            ];
          };
        },
      ];
      args: [];
    },
  ];
  accounts: [];
  events: [];
  errors: [
    {
      code: 1;
      name: '';
      msg: '';
    },
  ];
  types: [];
};
