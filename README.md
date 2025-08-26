# 📋 Mini Single Page Application — TODO List con React + Firebase

Este proyecto es una **mini aplicación web** construida con **React + Vite** y usando **Firebase (Firestore)** como backend.  
La temática elegida fue un **TODO List**, donde los usuarios pueden registrar tareas, marcarlas como completadas y eliminarlas.

---

## 🚀 Deploy
- **Aplicación en producción:** 👉 [https://todo-list-ch.vercel.app](https://todo-list-ch.vercel.app)  
- **Repositorio en GitHub:** 👉 [https://github.com/CristianHF29/todo-list-ch](https://github.com/CristianHF29/todo-list-ch)

---

## ⚙️ Tecnologías usadas
- React + Vite ⚛️
- Firebase (Cloud Firestore) 🔥
- JavaScript (ES6+)
- CSS puro para estilos básicos

---

## ✨ Funcionalidades
- **Agregar tareas** → Se guardan en Firestore (**POST**).
- **Listar tareas en tiempo real** → Se leen desde Firestore (**GET** con `onSnapshot`).
- **Marcar como completadas** → Se actualiza el estado en Firestore (**UPDATE**).
- **Eliminar tareas** → Se borra el documento en Firestore (**DELETE**, opcional).
- Interfaz centrada y responsive con diseño limpio.

---
