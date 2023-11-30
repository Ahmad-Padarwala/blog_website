import React from "react";
import { Routes, Route } from "react-router-dom";
import BookView from "../pages/bookView";

const ViewBookRoute = () => {
    return (
        <>
            <Routes>
                <Route
                    path="/viewBookPage/:id"
                    element={
                        <>
                            <BookView />
                        </>
                    }
                />
            </Routes>
        </>
    );
};

export default ViewBookRoute;
