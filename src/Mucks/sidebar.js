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
      text: "Entradas",
      path: "/entradas",
      name: "list-min",
      children: [
        {
          icon: "",
          text: "Todas",
          path: "/entradas",
        },
        {
          icon: "",
          text: "Buscar",
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
