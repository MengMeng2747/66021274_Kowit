import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UserDetaillPage.css"; // แนะนำให้ css อยู่โฟลเดอร์เดียวกัน

interface UserDetail {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
}

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      if (!response.ok) {
        throw new Error("User not found");
      }

      const data: UserDetail = await response.json();
      setUser(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return null;

  return (
    <div className="user-detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>{user.name}</h2>
      <p>
        <b>Username:</b> {user.username}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>
      <p>
        <b>Phone:</b> {user.phone}
      </p>
      <p>
        <b>Website:</b> {user.website}
      </p>

      <h3>Company</h3>
      <p>{user.company.name}</p>
      <p>{user.company.catchPhrase}</p>

      <h3>Address</h3>
      <p>
        {user.address.street}, {user.address.city} {user.address.zipcode}
      </p>
    </div>
  );
};

export default UserDetailPage;
