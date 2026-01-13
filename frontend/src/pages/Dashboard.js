
import { useNavigate } from "react-router-dom";
import KanbanBoard from "../components/KanbanBoard";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Kanban Board</h2>

        <button
          onClick={() => navigate("/logout")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#d9534f",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <KanbanBoard />
    </div>
  );
}
