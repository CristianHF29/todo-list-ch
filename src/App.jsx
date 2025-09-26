import { useEffect, useState } from "react";
import { db, auth } from "./credentials";
import {
  addDoc, collection, onSnapshot, orderBy, query,
  serverTimestamp, updateDoc, deleteDoc, doc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  const [uid, setUid] = useState(null);

  // 1) Espera a que haya usuario (anónimo o con proveedor)
  useEffect(() => {
    const stop = onAuthStateChanged(auth, (user) => setUid(user?.uid ?? null));
    return () => stop();
  }, []);

  // 2) Suscríbete a las tareas del usuario cuando haya UID
  useEffect(() => {
    if (!uid) return;
    const colRef = collection(db, "users", uid, "tasks");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setItems(data);
    });
    return () => unsub();
  }, [uid]);

  // 3) Helpers que usan la ruta por usuario
  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim() || !uid) return;
    const colRef = collection(db, "users", uid, "tasks");
    await addDoc(colRef, {
      title: title.trim(),
      done: false,
      createdAt: serverTimestamp(),
    });
    setTitle("");
  };

  const toggleDone = async (item) => {
    if (!uid) return;
    await updateDoc(doc(db, "users", uid, "tasks", item.id), {
      done: !item.done,
    });
  };

  const removeTask = async (id) => {
    if (!uid) return;
    await deleteDoc(doc(db, "users", uid, "tasks", id));
  };

  // --- UI (igual a la tuya) ---
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #dbeafe, #e0e7ff)",
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
        <h1 style={{
          textAlign: "center", marginBottom: "1.5rem",
          fontSize: "2rem", fontWeight: "bold", color: "#1f2937",
        }}>
          📋 MI TO-DO LIST
        </h1>

        <form onSubmit={addTask} style={{ display: "flex", gap: 12, marginBottom: 28 }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Escribe una tarea..."
            style={{
              flex: 1, padding: "14px 16px", borderRadius: 12,
              border: "1px solid #ddd", outline: "none", fontSize: 16,
            }}
          />
          <button
            type="submit"
            disabled={!uid}
            title={!uid ? "Conectando..." : "Agregar"}
            style={{
              padding: "14px 20px", borderRadius: 12, border: "none",
              background: "#4f46e5", color: "#fff", fontSize: 18,
              fontWeight: 600, cursor: "pointer", transition: "0.2s",
              opacity: uid ? 1 : 0.6,
            }}
          >
            +
          </button>
        </form>

        {items.length === 0 && (
          <p style={{ color: "#6b7280", textAlign: "center" }}>
            {uid ? "No hay tareas aún." : "Conectando..."}
          </p>
        )}

        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 14 }}>
          {items.map((t) => (
            <li key={t.id} style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", padding: "14px 18px",
              border: "1px solid #eee", borderRadius: 14,
              background: "#f9fafb", boxShadow: "0 2px 4px rgba(0,0,0,.05)",
            }}>
              <label style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <input type="checkbox" checked={!!t.done} onChange={() => toggleDone(t)} />
                <span style={{
                  fontSize: 16, fontWeight: 500,
                  textDecoration: t.done ? "line-through" : "none",
                  color: t.done ? "#9ca3af" : "#111",
                }}>
                  {t.title}
                </span>
              </label>
              <button
                onClick={() => removeTask(t.id)}
                style={{
                  border: "none", background: "#fee2e2", color: "#b91c1c",
                  borderRadius: 10, padding: "6px 12px", cursor: "pointer",
                  fontSize: 14, fontWeight: 600,
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

