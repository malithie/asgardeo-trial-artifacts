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
            clientID: "LllWT6dwCW3FyTog1mxz9wPXTEAa",
            serverOrigin: "https://api.asgardeo.io/t/maloutconsumer",
            scope: ["openid", "email", "profile", "internal_login"],
            resourceServerURLs: ["https://sts.choreo.dev", "https://fc263d73-2930-473f-b767-bbb78f00c212-prod.e1-us-east-azure.choreoapis.dev"],
            enableOIDCSessionManagement: "true",
        }}
    >
        <App />
    </AuthProvider>
);

render((<Index />), document.getElementById("root"));
