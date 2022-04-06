import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import App from "./App";
import { AuthProvider } from "@asgardeo/auth-react";

const Index = () => (
    // PROD
    <AuthProvider
        config={{
            signInRedirectURL: "http://localhost:3000",
            signOutRedirectURL: "http://localhost:3000",
            clientID: "pVpdqRYFlkIx6GHOS7rd4zPI2xoa",
            serverOrigin: "https://api.asgardeo.io/t/maloutconsumer",
            scope: ["openid", "email", "profile", "internal_login"],
            resourceServerURLs: ["https://sts.choreo.dev", "https://fc263d73-2930-473f-b767-bbb78f00c212-prod.e1-us-east-azure.choreoapis.dev"],
            enableOIDCSessionManagement: "true",
        }}
    >
        <App />
    </AuthProvider>

    // <AuthProvider
    //     config={{
    //         signInRedirectURL: "http://localhost:3000",
    //         signOutRedirectURL: "http://localhost:3000",
    //         clientID: "pVpdqRYFlkIx6GHOS7rd4zPI2xoa",
    //         serverOrigin: "https://api.asgardeo.io/t/maloutconsumer",
    //         scope: ["openid", "email", "profile", "internal_login"],
    //         resourceServerURLs: ["https://sts.choreo.dev", "https://fc263d73-2930-473f-b767-bbb78f00c212-prod.e1-us-east-azure.choreoapis.dev"],
    //     }}
    // >
    //     <App />
    // </AuthProvider>

    // STAGE
    // <AuthProvider
    //     config={{
    //         signInRedirectURL: "http://localhost:3000",
    //         signOutRedirectURL: "http://localhost:3000",
    //         clientID: "oLNfiw4FosdFTSj_fxuhl9C91FUa",
    //         serverOrigin: "https://stage.api.asgardeo.io/t/authello.com",
    //         scope: ["openid", "profile", "internal_login"],
    //         resourceServerURLs: ["https://sts.choreo.dev", "https://fc263d73-2930-473f-b767-bbb78f00c212-prod.e1-us-east-azure.choreoapis.dev"],
    //     }}
    // >
    //     <App />
    // </AuthProvider>

    // DEV
    // <AuthProvider
    //     config={{
    //         signInRedirectURL: "http://localhost:3000",
    //         signOutRedirectURL: "http://localhost:3000",
    //         clientID: "ZKfWfuLhcxZQeAT6gJp78N8nXbMa",
    //         serverOrigin: "https://dev.api.asgardeo.io/t/authello",
    //         scope: ["openid", "profile", "internal_login"],
    //         resourceServerURLs: ["https://sts.choreo.dev", "https://fc263d73-2930-473f-b767-bbb78f00c212-prod.e1-us-east-azure.choreoapis.dev"],
    //     }}
    // >
    //     <App />
    // </AuthProvider>
);

render((<Index />), document.getElementById("root"));
