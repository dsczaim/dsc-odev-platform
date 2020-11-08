const roles = {
  member: process.env.VUE_APP_ROLE_MEMBER,
  flutter: process.env.VUE_APP_ROLE_FLUTTER,
  database: process.env.VUE_APP_ROLE_DATABASE,
  quantum: process.env.VUE_APP_ROLE_QUANTUM,
  iot: process.env.VUE_APP_ROLE_IOT,
  machine: process.env.VUE_APP_ROLE_MACHINE,
  social: process.env.VUE_APP_ROLE_SOCIAL,
};

const teams = [];
teams[process.env.VUE_APP_ROLE_FLUTTER] = "Flutter";
teams[process.env.VUE_APP_ROLE_DATABASE] = "Database & Firebase";
teams[process.env.VUE_APP_ROLE_QUANTUM] = "Quantum Computing";
teams[process.env.VUE_APP_ROLE_IOT] = "IOT";
teams[process.env.VUE_APP_ROLE_MACHINE] = "Machine-Learning";
teams[process.env.VUE_APP_ROLE_SOCIAL] = "Social Media Team";

const ids = [];
ids[process.env.VUE_APP_ROLE_FLUTTER] = "flt";
ids[process.env.VUE_APP_ROLE_DATABASE] = "dtb";
ids[process.env.VUE_APP_ROLE_QUANTUM] = "qtc";
ids[process.env.VUE_APP_ROLE_IOT] = "iot";
ids[process.env.VUE_APP_ROLE_MACHINE] = "mcl";
ids[process.env.VUE_APP_ROLE_SOCIAL] = "smt";

export default {
  roles,
  teams,
  ids,
};
