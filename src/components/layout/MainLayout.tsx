import React from "react";

interface Props {
    children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
    return (
        <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>
            {children}
        </div>
    );
};