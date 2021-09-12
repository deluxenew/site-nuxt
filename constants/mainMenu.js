export const mainMenu = [
  {
    id: 0,
    title: "Главная",
    link: "/",
    children: [],
    background: "",
    iconName: "home",
    isParent: true,
  },
  {
    id: 2,
    title: "Проекты",
    link: "/",
    children: [
      {
        id: 0,
        title: "Все проекты",
        link: "/projects",
        iconName: "home",
        isParent: true,
      },
      {
        id: 1,
        title: "Брусовые",
        link: "/projects",
        iconName: "home",
      },
      {
        id: 2,
        title: "Бревенчатые",
        link: "/",
        iconName: "home",
      },
      {
        id: 3,
        title: "Конструктор",
        link: "/",
        iconName: "home"
      },
      {
        id: 4,
        title: "Премиум",
        link: "/",
        iconName: "home"
      },
      {
        id: 5,
        title: "Эконом",
        link: "/",
        iconName: "home"
      },
      {
        id: 6,
        title: "Каменные",
        link: "/",
        iconName: "home"
      }
    ],
    iconName: "home",
  },
  {
    id: 3,
    title: "Галерея",
    link: "/",

    iconName: "photo",
  },
  {
    id: 4,
    title: "Статьи",
    link: "/",
    children: [],
    iconName: "articles",
  },
  {
    id: 5,
    title: "FAQ",
    link: "/",
    children: [],
    iconName: "comments",
  },
  {
    id: 6,
    title: "Услуги",
    link: "/",
    children: [],
    iconName: "services",
  },
]
