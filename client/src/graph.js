import React from "react";
import { graphConfig } from "./graphConfig";

export async function callMsGraph(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(graphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const ProfileData = (props) => {
    return (
        <div id="profile-div">
          
            <p><strong>Mail: </strong> {props.graphData.userPrincipalName}</p>
       
        </div>
    );
};