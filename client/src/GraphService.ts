// import React from "react";
// import { graphConfig } from "./graphConfig";

// export async function callMsGraph(graphConfig, accessToken, range) {
//     const headers = new Headers();
//     const bearer = `Bearer ${accessToken}`;

//     headers.append("Authorization", bearer);

//     const options = {
//         method: "GET",
//         headers: headers
//     };

//     return fetch(graphConfig, options)
//         .then(response => response.json())
//         .catch(error => console.log(error));
// }

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <graphServiceSnippet1>
import moment, { Moment } from 'moment';
// import { Event } from 'microsoft-graph';
import { PageCollection, PageIterator } from '@microsoft/microsoft-graph-client';
import {accessToken} from './flux/actions/authActions'
import { Event } from '@microsoft/microsoft-graph-types';


var graph = require('@microsoft/microsoft-graph-client');

function getAuthenticatedClient(accessToken: string) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done: any) => {
      done(null, accessToken);
    }
  });

  return client;
}

export async function getUserDetails(accessToken: string) {
  const client = getAuthenticatedClient(accessToken);

  const user = await client
    .api('/me')
    .select('displayName,mail,mailboxSettings,userPrincipalName')
    .get();

  return user;
}
// </graphServiceSnippet1>

// <getUserWeekCalendarSnippet>
export async function getUserWeekCalendar(accessToken: string, startDate: Moment): Promise<Event[]> {
  const client = getAuthenticatedClient(accessToken);

  // Generate startDateTime and endDateTime query params
  // to display a 7-day window
  var startDateTime = startDate.format();
  var endDateTime = moment(startDate).add(7, 'day').format();

  // GET /me/calendarview?startDateTime=''&endDateTime=''
  // &$select=subject,organizer,start,end
  // &$orderby=start/dateTime
  // &$top=50
  var response: PageCollection = await client
    .api('/me/calendarview')
    // .header("Prefer", `outlook.timezone="${timeZone}"`)
    .query({ startDateTime: startDateTime, endDateTime: endDateTime })
    .select('subject,organizer,start,end,iCalUId')
    .orderby('start/dateTime')
    .top(50)
    .get();

  if (response["@odata.nextLink"]) {
    // Presence of the nextLink property indicates more results are available
    // Use a page iterator to get all results
    var events: Event[] = [];
    var pageIterator = new PageIterator(client, response, (event) => {
      events.push(event);
      return true;
    });
    await pageIterator.iterate();
    return events;
  } else {
    return response.value;
  }

}
// </getUserWeekCalendarSnippet>

// <createEventSnippet>
export async function createEvent(accessToken: string, newEvent: Event): Promise<Event> {
  const client = getAuthenticatedClient(accessToken);

  // POST /me/events
  // JSON representation of the new event is sent in the
  // request body
  return await client
    .api('/me/events')
    .post(newEvent);
}
// </createEventSnippet>