import { useEffect, useState } from "react";
import { db } from "./credentials";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function App() {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  const colRef = collection(db, "tasks");

  // get in real time
  useEffect(() => {
    const q = query(colRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setItems(data);
    });
    return () => unsub();
  }, []);

  // post
  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addDoc(colRef, {
      title: title.trim(),
      done: false,
      createdAt: serverTimestamp(),
    });
    setTitle("");
  };

  // udpate
  const toggleDone = async (item) => {
    await updateDoc(doc(db, "tasks", item.id), { done: !item.done });
  };

  // delete
  const removeTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #dbeafe, #e0e7ff)", // fondo celeste/lila
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <main
        style={{
          width: "100%",
          maxWidth: 600,
          background: "#fff",
          borderRadius: 20,
          padding: "2.5rem",
          boxShadow: "0 12px 30px rgba(0,0,0,.15)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#1f2937",
          }}
        >
          📋 MI TO-DO LIST
        </h1>

        {/* Form */}
        <form
          onSubmit={addTask}
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Escribe una tarea..."
            style={{
              flex: 1,
              padding: "14px 16px",
              borderRadius: 12,
              border: "1px solid #ddd",
              outline: "none",
              fontSize: 16,
            }}
          />
          <button
            type="submit"
            style={{
              padding: "14px 20px",
              borderRadius: 12,
              border: "none",
              background: "#4f46e5",
              color: "#fff",
              fontSize: 18,
              fontWeight: 600,
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            +
          </button>
        </form>

        {/* tasks List */}
        {items.length === 0 && (
          <p style={{ color: "#6b7280", textAlign: "center" }}>
            No hay tareas aún.
          </p>
        )}

        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 14 }}>
          {items.map((t) => (
            <li
              key={t.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 18px",
                border: "1px solid #eee",
                borderRadius: 14,
                background: "#f9fafb",
                boxShadow: "0 2px 4px rgba(0,0,0,.05)",
              }}
            >
              <label style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <input
                  type="checkbox"
                  checked={!!t.done}
                  onChange={() => toggleDone(t)}
                />
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    textDecoration: t.done ? "line-through" : "none",
                    color: t.done ? "#9ca3af" : "#111",
                  }}
                >
                  {t.title}
                </span>
              </label>
              <button
                onClick={() => removeTask(t.id)}
                style={{
                  border: "none",
                  background: "#fee2e2",
                  color: "#b91c1c",
                  borderRadius: 10,
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
