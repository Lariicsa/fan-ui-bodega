export default {
  items: [
    {
      icon: "",
      text: "Inicio",
      path: "/",
      name: "dashboard",
    },
    {
      icon: "",
      text: "Banner",
      path: "/banner",
      name: "banner",
    },
    {
      icon: "",
      text: "Precarga",
      path: "/preload",
      name: "precarga",
    },
    {
      icon: "",
      text: "Entradas",
      path: "/entradas",
      name: "list-min",
      children: [
        {
          icon: "now-ui-icons files_paper",
          text: "Buscar ",
          path: "/entradas",
        },
      ],
    },
    {
      icon: "",
      text: "Logs",
      path: "/logs",
      name: "logs", 
    },
    {
      icon: "",
      text: "Cerrar Sesión",
      path: "/logout",
      name: "logout ", 
    },
  ],
};
