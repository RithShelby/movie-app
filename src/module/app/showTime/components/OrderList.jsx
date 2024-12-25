import React, { useEffect, useState } from "react";
import {useShowTime} from "../core/hook";

const OrderList = () => {
    const [orderList, setOrderList] = useState([]);
    const {deleteBooking} = useShowTime();
    useEffect(() => {
        const storedOrders = localStorage.getItem("ordered");
        if (storedOrders) {
            setOrderList(JSON.parse(storedOrders)); // Parse and set initial state
        }
    }, []);
    const handleDelete = async (id) => {
        await deleteBooking(id); // Call the delete function
        setOrderList(prevOrders => prevOrders.filter(order => order.id !== id)); // Update state
    };
    return (
        <div className="lg:py-36 text-white lg:p-36 md:p-20 p-3 h-screen w-full overflow-y-auto py-10">
            <p className="text-2xl underline md:mt-5 text-center">Your Ordered Tickets</p>
            {orderList.length > 0 ? (
                orderList.map((order, index) => (
                    <div
                        key={order.id}
                        className="border-b-2 rounded-lg border-dashed border-gray-500 mt-10 bg-transparent text-lg leading-10 text-zinc-300 flex justify-evenly lg:w-3/4 m-auto lg:py-5 md:py-5 shadow-lg shadow-sky-400">
                        <img
                            src={order.movieImg}
                            alt={order.movieName}
                            className="lg:w-56 md:w-56 w-28 h-full rounded-md"
                        />
                        <span className="ps-4">
                            <p>Movie : {order.movieName}</p>
                            <p>Hall : {order.hall}</p>
                            <p>Date : {order.date}</p>
                            <p className="border-b-2 border-gray-500 border-dashed">
                                Seat : {order.selectedSeats}
                            </p>
                            <p className="py-10">Total : ${order.totalPrice}</p>
                             <button
                                 onClick={() => handleDelete(order.id)}
                                 className="btn btn-error"
                             >
                                Delete
                            </button>
                        </span>
                    </div>
                ))
            ) : (
                <p className="text-center mt-20 text-xl font-extralight" >You still not book any movies.🤷‍♂️</p>
            )}
        </div>
    );
};

export default OrderList;
