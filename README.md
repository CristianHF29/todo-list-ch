# 📋 Mini Single Page Application — TODO List with React + Firebase

This project is a **mini web application** built with **React + Vite** and using **Firebase (Firestore)** as the backend.  
The chosen theme is a **TODO List**, where users can add tasks, mark them as completed, and delete them.

---

## 🚀 Deploy
- **Production App:** 👉 [https://todo-list-ch.vercel.app](https://todo-list-ch.vercel.app)  
- **GitHub Repository:** 👉 [https://github.com/CristianHF29/todo-list-ch](https://github.com/CristianHF29/todo-list-ch)

---

## ⚙️ Tech Stack
- React + Vite ⚛️
- Firebase (Cloud Firestore + Authentication) 🔥
- JavaScript (ES6+)
- Pure CSS for styling

---

## 🔒 Security & Data Structure
- **Authentication:** Firebase **Anonymous Authentication** is enabled by default.  
- **Per-user tasks:** Tasks are stored under each user’s unique UID in the following path:
- **Security rules** ensure that:
  - A user can only read/write their own tasks.
  - Data validation checks that each task has `title`, `done`, and `createdAt`.

---

## ✨ Features
- **Add tasks** → Stored in Firestore (**POST**).
- **List tasks in real time** → Synced with Firestore using `onSnapshot` (**GET**).
- **Mark tasks as completed** → Updates the task status in Firestore (**UPDATE**).
- **Delete tasks** → Removes the document from Firestore (**DELETE**).
- Clean, responsive, and centered interface.

---

## 📂 Future Improvements
- Add **Google Sign-In** so users can log in and keep their tasks across devices.
- Add filtering (e.g., "All", "Completed", "Pending").
- Support for task deadlines and reminders.
