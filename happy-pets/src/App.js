import "./App.css";
import React, { useState } from "react";
import { AppLayout, DashboardView, LoginView } from "./components";
import { useAuthContext } from "@asgardeo/auth-react";

function App() {
    /** Empty state  */
    const { state, signIn, signOut, httpRequest, getIDToken, requestCustomGrant } = useAuthContext();
    const [ insuranceClaimsFromAPI, setInsuranceClaimsFromAPI ] = useState(undefined);

    React.useEffect(() => {
        if (!state?.isAuthenticated) {
            return;
        }

        (async () => {
            const idToken = await getIDToken();
            const choreoToken = await exchangeToken(idToken);

            try {
                const username =  state.email || state.username;
                const apiResponse = await callAPI(choreoToken, username);
                setInsuranceClaimsFromAPI(apiResponse);
            } catch (error) {
                // Log or use an alert here.
            }
        })();
    }, [state?.isAuthenticated]);


    const exchangeToken = (idToken) => {
        console.log("----   Requesting a token from Choreo ----")
        console.log(idToken);
        const config = {
            tokenEndpoint: "https://sts.choreo.dev/oauth2/token",
            attachToken: false,
            data: {
                client_id: process.env.REACT_APP_CHOREO_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CHOREO_APP_CLIENT_SECRET,
                grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
                subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
                requested_token_type: "urn:ietf:params:oauth:token-type:jwt",
                scope: "custom_scope",
                subject_token: idToken,
            },
            id: "choreo-token-exchange"
        }

        return requestCustomGrant(config).then((response) => {
            console.log(response);
            return response?.access_token;
        }).catch((error) => {
            console.error(error);
        });
    }


    const callAPI = (choreoToken, userIdentifier) => {
        console.log("----   Authenticated User: ", userIdentifier)
        console.log("----   Calling the API with Bearer: ", choreoToken)
        const requestConfig = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + choreoToken
            },
            attachToken: false,
            method: "GET",
            url: process.env.REACT_APP_CHOREO_API_URL,
            params: {"customerEmail": userIdentifier}
        };

        return httpRequest(requestConfig)
            .then((response) => {
                console.log("API response: ", response);
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    };

    ;


    return (
        <AppLayout
            isLoading={state.isLoading}
            isAuthenticated={state.isAuthenticated}
            logoutButton={
                <button onClick={() => signOut()}>Logout</button>
            }
        >
            <LoginView
                isAuthenticated={state.isAuthenticated}
                loginButton={
                    <button onClick={() => signIn()}>Login</button>
                }
            />

            <DashboardView
                isAuthenticated={state.isAuthenticated}
                username={state.username}
                email={state.email}
                insuranceClaims={ insuranceClaimsFromAPI }
            />
        </AppLayout>
    );
}

export default App;
