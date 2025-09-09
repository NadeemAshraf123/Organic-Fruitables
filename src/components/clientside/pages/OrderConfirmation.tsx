import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../../features/currentuser/CurrentUserSlice";
import type { RootState } from "../../../app/Store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderConfirmation: React.FC = () => {
  const [latestOrder, setLatestOrder] = useState(null);
  const [showMessage, setShowMessage] = useState(true);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const navigate = useNavigate();


  const currentUser = useSelector((state: RootState) => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const res = await axios.get("http://localhost:3000/orders?_sort=createdAt&_order=desc&_limit=1");
        setLatestOrder(res.data[0]);
      } catch (error) {
        console.error("Failed to fetch latest order", error);
      }
    };

    const currentuser = async () => {
      const email = localStorage.getItem("userEmail");
      if (!email || currentUser) 
        return;

      try {
        const res = await axios.get(`http://localhost:3000/fruitablesusers?email=${email}`);
        const data = res.data;
        if (data.length > 0) {
          dispatch(setCurrentUser(data[0]));
        }
      } catch (error) {
        console.log("Failed to fetched user:", error);
      }
    };

    fetchLatestOrder();
    currentuser();



const timer = setTimeout(() => {
  setShowMessage(false);
}, 3000);

return () => clearTimeout(timer);
  }, []);


  return (
  
    <div className="flex flex-col md:flex-row gap-6 mt-50 px-2">

     
 <div className="md:w-1/2 bg-gray-100 p-4 rounded shadow">

   <div className="flex items-center justify-start gap-4 mb-2">
  <button
    onClick={() => setShowUserInfo(prev => !prev)}
    className="text-[#81C408] font-semibold cursor-pointer hover:text-[#4d7504]"
  >
    {showUserInfo ? "Hide Info" : "Active User"}
  </button>
   <button
      // onClick={() => navigate("/orders")}
      className="text-[#81C408] font-semibold cursor-pointer hover:text-[#4d7504]"
    >
      Orders
    </button>
     <button
      // onClick={() => navigate("/orders")}
      className="text-[#81C408] font-semibold cursor-pointer hover:text-[#4d7504]"
    >
      Orders History
    </button>
  </div>

  {showUserInfo && currentUser && (
    <div className="mt-4 text-left">
      <p><strong>ID:</strong> {currentUser.id}</p>
      <p><strong>Name:</strong> {currentUser.name}</p>
      <p><strong>Email:</strong> {currentUser.email}</p>
      <p><strong>Role:</strong> {currentUser.role}</p>
    </div>
  )}

  {!currentUser && (
    <p className="text-red-600 mt-4">No user is logged in.</p>
  )}
</div>




    <div className="md:w-2/3 bg-white p-6 rounded-xl shadow-md">
      {showMessage && (
      <h2 id="order" className="text-2xl font-bold text-green-700 mb-4"
        >
         Order Placed Successfully!
      </h2>
      )}

      <p className="text-gray-700 mb-6">Your order has been received and is currently <strong>pending</strong>.</p>

      {latestOrder && (
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <ul className="list-disc pl-6">
            {latestOrder.items.map((item: any) => (
              <li key={item.id}>
                {item.name} × {item.quantity} — ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold">Total: ${latestOrder.total.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-2">Placed at: {new Date(latestOrder.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>

    </div>    
  );
};

export default OrderConfirmation;
