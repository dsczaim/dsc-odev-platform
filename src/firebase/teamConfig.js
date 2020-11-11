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

const idToName = [];
idToName["flt"] = "Flutter";
idToName["dtb"] = "Database & Firebase";
idToName["qtc"] = "Quantum Computing";
idToName["iot"] = "IOT";
idToName["mcl"] = "Machine-Learning";

const media = [];
media["qtc"] = {
  picture56: require("@/assets/teams_logo/quant56.png"),
  picture32: require("@/assets/teams_logo/quant32.png"),
  color1: "#2c5cd5",
  color3: "#f9c40f",
  color2: "#ffffff",
};
media["flt"] = {
  picture56: require("@/assets/teams_logo/flutter56.png"),
  picture32: require("@/assets/teams_logo/flutter32.png"),
  color1: "#13B9FD",
  color2: "#02569B",
  color3: "#ffffff",
};
media["dtb"] = {
  picture56: require("@/assets/teams_logo/firebase56.png"),
  picture32: require("@/assets/teams_logo/firebase32.png"),
  color1: "#FFCA28",
  color2: "#039BE5",
  color3: "#2C384A",
};
media["iot"] = {
  picture56: require("@/assets/teams_logo/iot56.png"),
  picture32: require("@/assets/teams_logo/iot32.png"),
  color2: "#4181ef",
  color1: "#d6e5f9",
  color3: "#3c7ce4",
};

media["mcl"] = {
  picture56: require("@/assets/teams_logo/ml56.png"),
  picture32: require("@/assets/teams_logo/ml32.png"),
  color1: "#425066",
  color2: "#FFA800",
  color3: "#FF6F00",
};

export default {
  roles,
  teams,
  ids,
  idToName,
  media,
};
