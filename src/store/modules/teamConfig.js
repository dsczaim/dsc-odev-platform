const state = {
  roles: {
    member: process.env.VUE_APP_ROLE_MEMBER,
    flutter: process.env.VUE_APP_ROLE_FLUTTER,
    database: process.env.VUE_APP_ROLE_DATABASE,
    quantum: process.env.VUE_APP_ROLE_QUANTUM,
    iot: process.env.VUE_APP_ROLE_IOT,
    machine: process.env.VUE_APP_ROLE_MACHINE,
    dsc: process.env.VUE_APP_ROLE_DSC,
  },

  idToName: {
    dtb: "Database & Firebase",
    flt: "Flutter",
    iot: "IOT",
    mcl: "Machine-Learning",
    qtc: "Quantum Computing",
    dsc: "Google DSC Zaim",
  },

  teams: new Map([
    [process.env.VUE_APP_ROLE_DATABASE, "Database & Firebase"],
    [process.env.VUE_APP_ROLE_FLUTTER, "Flutter"],
    [process.env.VUE_APP_ROLE_IOT, "IOT"],
    [process.env.VUE_APP_ROLE_MACHINE, "Machine-Learning"],
    [process.env.VUE_APP_ROLE_QUANTUM, "Quantum Computing"],
    [process.env.VUE_APP_ROLE_DSC, "Google DSC Zaim"],
  ]),

  ids: new Map([
    [process.env.VUE_APP_ROLE_DATABASE, "dtb"],
    [process.env.VUE_APP_ROLE_FLUTTER, "flt"],
    [process.env.VUE_APP_ROLE_IOT, "iot"],
    [process.env.VUE_APP_ROLE_MACHINE, "mcl"],
    [process.env.VUE_APP_ROLE_QUANTUM, "qtc"],
    [process.env.VUE_APP_ROLE_DSC, "dsc"],
  ]),

  media: new Map([
    [
      "qtc",
      {
        picture56: require("@/assets/teams_logo/quant56.png"),
        picture32: require("@/assets/teams_logo/quant32.png"),
        color1: "#2c5cd5",
        color3: "#f9c40f",
        color2: "#ffffff",
      },
    ],
    [
      "flt",
      {
        picture56: require("@/assets/teams_logo/flutter56.png"),
        picture32: require("@/assets/teams_logo/flutter32.png"),
        color1: "#13B9FD",
        color2: "#02569B",
        color3: "#ffffff",
      },
    ],
    [
      "dtb",
      {
        picture56: require("@/assets/teams_logo/firebase56.png"),
        picture32: require("@/assets/teams_logo/firebase32.png"),
        color1: "#FFCA28",
        color2: "#039BE5",
        color3: "#2C384A",
      },
    ],
    [
      "iot",
      {
        picture56: require("@/assets/teams_logo/iot56.png"),
        picture32: require("@/assets/teams_logo/iot32.png"),
        color2: "#4181ef",
        color1: "#d6e5f9",
        color3: "#3c7ce4",
      },
    ],

    [
      "mcl",
      {
        picture56: require("@/assets/teams_logo/mcl56.png"),
        picture32: require("@/assets/teams_logo/mcl32.png"),
        color1: "#425066",
        color2: "#FFA800",
        color3: "#FF6F00",
      },
    ],
    [
      "dsc",
      {
        picture56: require("@/assets/teams_logo/dsc56.png"),
        picture32: require("@/assets/teams_logo/dsc32.png"),
        color1: "#FFFFFF",
        color2: "#FBBC04",
        color3: "#4285F4",
      },
    ],
  ]),
};
const getters = {
  getTeamConfig: (state) => {
    return {
      roles: state.roles,
      teams: state.teams,
      ids: state.ids,
      media: state.media,
      idToName: state.idToName,
    };
  },
};
export default { namespaced: true, state, getters };
