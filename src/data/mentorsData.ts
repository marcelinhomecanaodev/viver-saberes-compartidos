
export interface Skill {
  id: string;
  name: string;
}

export interface AvailableTime {
  day: string;
  startTime: string;
  endTime: string;
}

export interface MentorClass {
  id: string;
  mentorId: string;
  title: string;
  description: string;
  pricePerHour: number;
  skill: Skill;
}

export interface Mentor {
  id: string;
  name: string;
  photoUrl: string;
  bio: string;
  email: string;
  skills: Skill[];
  classes: MentorClass[];
  availableTimes: AvailableTime[];
  averageRating: number;
}

export const skills: Skill[] = [
  { id: "1", name: "Culinária" },
  { id: "2", name: "Costura" },
  { id: "3", name: "Jardinagem" },
  { id: "4", name: "Marcenaria" },
  { id: "5", name: "Artesanato" },
  { id: "6", name: "Pintura" },
  { id: "7", name: "Crochê" },
  { id: "8", name: "Fotografia" }
];

export const mockMentors: Mentor[] = [
  {
    id: "1",
    name: "Doroteia Silva",
    photoUrl: "/lovable-uploads/5cc21906-e3d5-4796-9da4-1ae84e78820d.png",
    bio: "Tenho mais de 40 anos de experiência em costura. Adoro ensinar e passar o meu conhecimento adiante.",
    email: "doroteia@example.com",
    skills: [{ id: "2", name: "Costura" }],
    classes: [
      {
        id: "101",
        mentorId: "1",
        title: "Aprenda a fazer bainha",
        description: "Nessa aula prática, vou te ensinar a fazer uma bainha a mão, com todos os passos e dicas!",
        pricePerHour: 25,
        skill: { id: "2", name: "Costura" }
      },
      {
        id: "102",
        mentorId: "1",
        title: "Customização de roupas",
        description: "Aprenda a dar nova vida às suas peças de roupa com técnicas de customização simples e eficazes.",
        pricePerHour: 30,
        skill: { id: "2", name: "Costura" }
      }
    ],
    availableTimes: [
      { day: "Segunda", startTime: "14:00", endTime: "17:00" },
      { day: "Quarta", startTime: "10:00", endTime: "12:00" },
      { day: "Sexta", startTime: "14:00", endTime: "18:00" }
    ],
    averageRating: 4.8
  },
  {
    id: "2",
    name: "Carlos Mendes",
    photoUrl: "/lovable-uploads/727dd1b1-7f4b-4b8d-a2be-39ecf1cd0557.png",
    bio: "Aposentado após 35 anos como chef de cozinha. Especializado em culinária brasileira tradicional e sustentável.",
    email: "carlos@example.com",
    skills: [{ id: "1", name: "Culinária" }],
    classes: [
      {
        id: "201",
        mentorId: "2",
        title: "Pratos típicos brasileiros",
        description: "Uma aula completa sobre como preparar os mais famosos pratos da culinária brasileira de forma autêntica.",
        pricePerHour: 40,
        skill: { id: "1", name: "Culinária" }
      }
    ],
    availableTimes: [
      { day: "Terça", startTime: "14:00", endTime: "17:00" },
      { day: "Quinta", startTime: "14:00", endTime: "17:00" },
      { day: "Sábado", startTime: "09:00", endTime: "12:00" }
    ],
    averageRating: 4.9
  },
  {
    id: "3",
    name: "Ana Ribeiro",
    photoUrl: "/lovable-uploads/a81334ac-4bf7-4b85-a4bf-71d85f9dea79.png",
    bio: "Jardineira aposentada com mais de 20 anos de experiência em cultivo orgânico e plantas medicinais.",
    email: "ana@example.com",
    skills: [{ id: "3", name: "Jardinagem" }],
    classes: [
      {
        id: "301",
        mentorId: "3",
        title: "Horta urbana em pequenos espaços",
        description: "Aprenda como montar e manter uma horta mesmo em apartamentos ou casas com pouco espaço.",
        pricePerHour: 30,
        skill: { id: "3", name: "Jardinagem" }
      }
    ],
    availableTimes: [
      { day: "Segunda", startTime: "09:00", endTime: "11:00" },
      { day: "Quarta", startTime: "14:00", endTime: "16:00" },
      { day: "Sexta", startTime: "09:00", endTime: "11:00" }
    ],
    averageRating: 4.7
  },
  {
    id: "4",
    name: "João Pereira",
    photoUrl: "/lovable-uploads/7bbd333b-8831-4e25-8069-ce6060abc8d3.png",
    bio: "Marceneiro aposentado com 40 anos de experiência em móveis feitos à mão e restauração de peças antigas.",
    email: "joao@example.com",
    skills: [{ id: "4", name: "Marcenaria" }],
    classes: [
      {
        id: "401",
        mentorId: "4",
        title: "Introdução à marcenaria para iniciantes",
        description: "Nessa aula você vai aprender as ferramentas básicas e técnicas para começar seus projetos em madeira.",
        pricePerHour: 45,
        skill: { id: "4", name: "Marcenaria" }
      }
    ],
    availableTimes: [
      { day: "Terça", startTime: "09:00", endTime: "12:00" },
      { day: "Quinta", startTime: "09:00", endTime: "12:00" },
      { day: "Sábado", startTime: "14:00", endTime: "18:00" }
    ],
    averageRating: 4.9
  },
  {
    id: "5",
    name: "Maria Conceição",
    photoUrl: "/lovable-uploads/61c7962e-7407-494b-8cda-2f606ec0bc48.png",
    bio: "Artesã há mais de 30 anos, especializada em trabalhos com argila, cerâmica e materiais reciclados.",
    email: "maria@example.com",
    skills: [{ id: "5", name: "Artesanato" }],
    classes: [
      {
        id: "501",
        mentorId: "5",
        title: "Artesanato sustentável",
        description: "Aprenda a criar peças artesanais bonitas e úteis utilizando materiais reciclados do dia a dia.",
        pricePerHour: 25,
        skill: { id: "5", name: "Artesanato" }
      }
    ],
    availableTimes: [
      { day: "Segunda", startTime: "14:00", endTime: "16:00" },
      { day: "Quarta", startTime: "14:00", endTime: "16:00" },
      { day: "Sexta", startTime: "14:00", endTime: "16:00" }
    ],
    averageRating: 4.6
  }
];
