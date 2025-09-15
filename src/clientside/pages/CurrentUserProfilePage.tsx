import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../features/currentuser/CurrentUserSlice";
import type { RootState } from "../../app/Store";

const CurrentUserProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.currentUser);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = localStorage.getItem("user");
      const email=JSON.parse(user || '{}').email;
      
      if (!email) return setLoading(false);

      try {
        const res = await fetch(`http://localhost:3000/fruitablesusers?email=${email}`);
        const data = await res.json();
        if (data.length > 0) {
          dispatch(setCurrentUser(data[0]));
        }
      } catch (error) {
        console.log("Error fetching current user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [dispatch]);

  if (loading) return <p>Loading user data...</p>;
  if (!user) return <p>No user is logged in.</p>;

  return (
    <div className="p-2 mt-40">
      <h2 className="text-[#81C408] text-2xl font-bold">Current User Profile</h2>
      <p><strong className="font-bold text-xl">ID:</strong> {user.id}</p>
      <p><strong className="font-bold text-xl">Name:</strong> {user.name}</p>
      <p><strong className="font-bold text-xl">Email:</strong> {user.email}</p>
      <p><strong className="font-bold text-xl">Role:</strong> {user.role}</p>
    </div>
  );
};

export default CurrentUserProfilePage;
