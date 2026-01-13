import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import api from "../api/axios";

const columns = ["pending", "in-progress", "completed"];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/tasks").then(res => setTasks(res.data));
  }, []);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    await api.put(`/tasks/${taskId}`, { status: newStatus });

    setTasks(prev =>
      prev.map(t => t._id === taskId ? { ...t, status: newStatus } : t)
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: "20px" }}>
        {columns.map(col => (
          <Droppable droppableId={col} key={col}>
            {(p) => (
              <div ref={p.innerRef} {...p.droppableProps} style={{ width: "30%" }}>
                <h3>{col}</h3>
                {tasks.filter(t => t.status === col).map((t, i) => (
                  <Draggable draggableId={t._id} index={i} key={t._id}>
                    {(p) => (
                      <div
                        ref={p.innerRef}
                        {...p.draggableProps}
                        {...p.dragHandleProps}
                        style={{ padding: 10, border: "1px solid #ccc", marginBottom: 10 }}
                      >
                        <strong>{t.title}</strong>
                        <p>{t.description}</p>
                        <small>{new Date(t.due_date).toDateString()}</small>
                      </div>
                    )}
                  </Draggable>
                ))}
                {p.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
