import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";

interface PropsType {
    children: React.ReactNode;
}

const MainLayout: React.FC<PropsType> = ({ children }) => {
    return (
        <>
            <Header />
            <div className={"page-content"}>{children}</div>
            <Footer />
        </>
    );
};

export default MainLayout;
