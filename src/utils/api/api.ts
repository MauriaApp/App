import fetch from "isomorphic-fetch";
import { MauriaNoteType } from "../../types/note";

const API_URL = "https://mauriaapi.fly.dev";

// Toutes les données sont stockées dans le localStorage:
// email, password, planning, notes, absences, name

// Pour mettre à jour les données, il faut supprimer les données du localStorage avec les fonctions tout en bas (pour une déconnexion => utiliser ClearStorage() )
// Puis appeler la fonction qui permet de récupérer les données de son choix

// Fonction qui permet de se connecter (avec un email et un mot de passe)
export async function login(email: string, password: string) {
  await fetch(API_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email,
      password: password,
    }),
  })
    .then((response) => {
      response.status === 302
        ? AddToStorage(email, password)
        : window.alert("Identifiants incorrect !");
      fetchFirstName();
    })
    .catch((error) => {
      console.log(error);
    });

  return localStorage.getItem("email") != null;
}

function AddToStorage(email: string, password: string) {
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);
}

// Fonction qui permet de récupérer le planning d'un élève (sans parametres => récupère dans le localStorage)
export async function fetchPlanning() {
  let today = new Date();

  const start =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const end = start;

  const response = await fetch(
    API_URL + "/planning?start=" + start + "&end=" + end,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
      }),
    }
  );

  if (response.status === 200) {
    return response.json().then((data) => {
      localStorage.setItem("lastPlanningUpdate", `\"${today.toISOString()}\"`);
      localStorage.setItem("planning", JSON.stringify(data));
      return data;
    });
  }
  localStorage.setItem("planning", " ");
  return null;
}

export function getPlanning() {
  return localStorage.getItem("planning");
}

// Fonction qui permet de récupérer les notes d'un élève (sans parametres => récupère dans le localStorage)
export const fetchNotes = async (): Promise<{
  data: MauriaNoteType[] | null;
}> => {
  const shared = JSON.parse(
    localStorage.getItem("notesShared") || "false"
  ) as boolean;

  const setNewNotes = (data: MauriaNoteType[]) =>
    localStorage.setItem("newNotes", JSON.stringify(data));

  setNewNotes([]);

  const setCurrentNotes = (data: MauriaNoteType[]) =>
    localStorage.setItem("notes", JSON.stringify(data));

  const oldNotes = JSON.parse(localStorage.getItem("notes") || "[]") as MauriaNoteType[];

  const response = await fetch(API_URL + "/poststats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
      shared,
    }),
  });

  if (response.status === 200) {
    return response.json().then((data) => {
      if (shared) {
        fetchNoteStats();
      }

      const newNotes = data.filter(
        (note: MauriaNoteType) =>
          !oldNotes.find((oldNote: MauriaNoteType) => oldNote.code === note.code)
      );
      setNewNotes(newNotes);

      setCurrentNotes(data);

      // console.log("newNotes", newNotes);
      // console.log("oldNotes", oldNotes);
      
      return data;
    });
  }
  setCurrentNotes([]);
  return { data: null };
};

export function getNotes() {
  const notes = localStorage.getItem("notes");
  if (notes) {
    return JSON.parse(notes);
  }
  return null;
}


export async function pushNoteStats() {  
  await fetch(API_URL + "/poststats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
      shared : localStorage.getItem("notesShared"),
    }),
  });
  return null;
}

export async function fetchNoteStats(): Promise<MauriaNoteType[] | null> {
  const response = await fetch(API_URL + "/getstats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
    }),
  });

  if (response.status === 200) {
    return response.json().then((data) => {
      localStorage.setItem("userStats", JSON.stringify(data));
      return data;
    });
  }
  localStorage.setItem("userStats", "null");
  return null;
}

// Fonction qui permet de récupérer les absences d'un élève (sans parametres => récupère dans le localStorage)
export async function fetchAbsences() {
  const response = await fetch(API_URL + "/absences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
    }),
  });

  if (response.status === 200) {
    return response.json().then((data) => {
      localStorage.setItem("absences", JSON.stringify(data));
      return data;
    });
  }
  localStorage.setItem("absences", " ");
  return null;
}

export function getAbsences() {
  const absences = localStorage.getItem("absences");
  if (absences) {
    return JSON.parse(absences);
  }
  return null;
}

// Fonction qui permet de récupérer le prénom d'un élève (sans parametres => récupère dans le localStorage)
export function fetchFirstName() {
  let email = localStorage.getItem("email");
  if (email != null) {
    // Utilise une expression régulière pour séparer le prénom et le nom
    const match = email.match(/^([\w+-]*)([.-])/);
    let FirstName = "";
    if (match) {
      // Met la première lettre de chaque mot en majuscule
      FirstName = match[1]
        .split(/[-.]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("-");
    }
    localStorage.setItem("name", FirstName);
  } else {
    localStorage.setItem("name", " ");
  }

  return localStorage.getItem("name");
}

export function getFirstName() {
  return localStorage.getItem("name");
}

export async function fetchAssos() {

  const response = await fetch(API_URL + "/assos", {
    method: "GET",
  });

  if (response.status === 200) {
    return response.json().then((data) => {
      localStorage.setItem("associations", JSON.stringify(data));
      return data;
    });
  }
  localStorage.setItem("associations", " ");
  return null;
}

// Fonction qui permet de supprimer les données du localStorage
export function ClearStorage() {
  localStorage.clear();
}

// Fonction qui permet de supprimer l'email et le mot de passe du localStorage
export function ClearUser() {
  localStorage.removeItem("email");
  localStorage.removeItem("password");
}

// Fonction qui permet de supprimer le planning du localStorage
export function ClearPlanning() {
  localStorage.removeItem("planning");
}

// Fonction qui permet de supprimer les notes du localStorage
export function ClearNotes() {
  localStorage.removeItem("notes");
}

// Fonction qui permet de supprimer les absences du localStorage
export function ClearAbs() {
  localStorage.removeItem("absences");
}

// Fonction qui permet de supprimer le prénom du localStorage
export function ClearFirstName() {
  localStorage.removeItem("name");
}

// Fonction qui permet de charger le message important
export async function fetchImportantMessage() {
  return await fetch(API_URL + "/msg", {
    method: "GET",
  }).then(async (res) => {
    if (res.status === 200) {
      return await res.json();
    }

    return {
      title: "Erreur",
      message: "Une erreur est survenue, rechargez la page plus tard",
    };
  });
}

// Fonction qui permet de charger les mises à jour
export async function fetchUpdates() {
  const response = await fetch(API_URL + "/update", {
    method: "GET",
  });

  if (response.status === 200) {
    return response.json().then((data) => {
      localStorage.setItem("updates-log", JSON.stringify(data));
      return data;
    });
  }
  localStorage.setItem("updates-log", "[]");
  return null;
}


export function setNameTest(){
  localStorage.setItem("name", "PROUT");
}