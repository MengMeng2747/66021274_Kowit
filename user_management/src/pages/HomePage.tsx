import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../pages/HomePage.css";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string | number;
  website: string;
}

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ดึงรายชื่อผู้ใช้ (ครั้งเดียว)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data: User[] = await response.json();
        setUsers(data);
      } catch {
        setError("โหลดรายชื่อผู้ใช้ไม่สำเร็จ");
      }
    };

    fetchUsers();
  }, []);

  // ✅ ดึงข้อมูลเฉพาะตอนกด Click
  const fetchUserDetail = async (id: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user detail");
      }

      const data: User = await response.json();
      setSelectedUser(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">{user.name.charAt(0)}</div>

              <div className="profile-info">
                <h3>{user.name}</h3>
                <span className="username">@{user.username}</span>
              </div>
            </div>

            <div className="profile-body">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            </div>

            <div className="profile-footer">
              <Link to={`/users/${user.id}`} className="action-btn view">
                Click
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {/* แสดงรายละเอียดหลังจากกด Click */}
      {loading && <p>กำลังโหลดรายละเอียด...</p>}
    </div>
  );
};

export default HomePage;
