
// REACT
export interface ITarget {
  target: {
    value: React.SetStateAction<string>;
  };
  preventDefault(): void;
}

// ERRORS
// export interface IMsg {
//   msg: string | any;
// }

// // AUTH
export interface IUser {
  name?: string;
  email?: string;
  password?: string;
  points?: string;
}

export interface IPurchase {
  _id?: string;
  name: string;
  date?: string;
  pointsItem: string;
}

export interface IExistingPurchase {
  _id: string;
  name: string;
  date: string;
  pointsItem: string;
}

export interface IAuthForm {
  isAuthenticated?: boolean;
  authMsg: string;
}

export interface ILoginModal extends IAuthForm {
  login(user: IUser): void;
  resetPassword(email:string): void;
  register(user: IUser): void;
  authMsg: string;

}

export interface IResetPassword extends IAuthForm {
  resetPassword(email:string): void;
}

export interface IRegisterModal extends IAuthForm {
  register(user: IUser): void;
}

export interface ILogoutProps {
  logout(): void;
}

// export interface IError {
//   authMsg:string;
// }

export interface IAuthReduxProps {
  auth: { isAuthenticated: boolean };
  authMsg: string;
}

export interface IConfigHeaders {
  headers: {
    [index: string]: string;
  };
}

// // LANDING
export interface ILanding {
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
}

// EVENTS
export interface IExistingEvent {
  _id: string;
  title: string;
  location: string;
  organizer?:{
    email: string,
    name: string
  }
  isOrganizer?: string;
  dateStart: string;
  dateEnd: string;
  arrivalTime: string;
  endTime: string;
  attendees:IAttendee[];
}

export interface IExistingInvite {
  _id: string;
  title: string;
  organizer:{
    email: string,
    name: string
  }
  location: string;
  dateStart: string;
  dateEnd: string;
  arrivalTime?: string;
  attendees?:IAttendee[];
}

export interface IEvent {
  _id?: string;
  title: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  arrivalTime?: string;
  endTime?: string;
  attendees:IAttendee[];
}

export interface IItem {
  _id?: string;
  name: string;
  pointsItem: string;
  description: string;
}

export interface IExistingItem {
  _id: string;
  name: string;
  pointsItem: string;
  description: string;
}

export interface IInvite {
  _id?: string;
  title: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  arrivalTime?: string;
  attendees?:IAttendee[];
}

export interface IAttendee {
  _id?: string;
  email: string;
  name: string;
  status?: string;
}

export interface IEventAttendee{
  attendee: IAttendee;
}

export interface IEventAdd {
  addEvent(event: IEvent): void;
  onDismissModal: () => void;
}

export interface IAttendeeModal {
  addAttendee(attendee: IAttendee): void;
}

export interface IAttendeeReduxProps{
  attendee:{attendees: IAttendee[];}
}

//PURCHASE HISTORY

export interface IPurchaseHistory {
  purchase: {purchases: IExistingPurchase[];};
  getPurchases(): void;
}

export interface IPurchaseReduxProps{
  purchase: {purchases: IExistingPurchase[];};
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
}

//PURCHASE LIST ITEM

export interface IPurchaseListItem {
  purchase: IExistingPurchase;
}


//CALENDAR

export interface ICalendar {
  event: {events: IExistingEvent[];};
  getEvents(): void;
}

export interface IEventReduxProps{
  event:{events: IExistingEvent[];}
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
}

//EVENT LIST ITEM

export interface IEventListItem {
  event: IExistingEvent;
  deleteEvent(id: string): void;
  setCurrent(event: IExistingEvent): void;
}

//EVENT LOG

export interface IEventLog {
  current: IExistingEvent;
  logArrival(event: IEvent): void;
  logPoints(user:IUser): void;
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
};

export interface IEventLogReduxProps {
  current: IExistingEvent;
  event: any;
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
};

//EVENT EDIT

export interface IEventEdit {
  current: IExistingEvent;
  updateEvent(event: IEvent): void;
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
}

export interface IEventEditReduxProps {
  current: IExistingEvent;
  event: any;
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
};

//ITEM STORE

export interface IItemStore {
  item: {items: IExistingItem[];};
  getItems(): void;
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
}

export interface IItemReduxProps {
  item: {items: IExistingItem[];};
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
}

//ITEM LIST

export interface IItemListItem {
  item: IExistingItem;
  deleteItem(id: string): void;
  setCurrentItem(item: IExistingItem): void;
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
}

//ITEM DETAILS

export interface IItemDetails {
  currentItem: IExistingItem;
  logPoints(user:IUser): void;
  addPurchases(purchase:IPurchase): void;
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
};

export interface IItemReduxProps {
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
}

export interface IItemDetailReduxProps {
  currentItem: IExistingItem;
  item: any;
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
};

export interface IEventLog {
  current: IExistingEvent;
  logArrival(event: IEvent): void;
  logPoints(user:IUser): void;
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
};

export interface IEventLogReduxProps {
  current: IExistingEvent;
  event: any;
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
};

//

export interface ILeaderBoard {
  event: {events: IExistingEvent[];};
  getEvents(): void;
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
}

export interface IEventListReduxProps {
  event: IExistingEvent;
}


//////

export interface IInviteListItem {
  invite: IExistingInvite 
  setCurrentInvite(invite: IExistingInvite): void;
  addInvite(invite: IInvite): void;
  declineInvite(invite: IInvite): void;
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
}

export interface IInviteListReduxProps{
  currentInvite: IExistingInvite;
  invite: any
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
}

export interface IInviteModal {
  invite:{invites: IExistingInvite[];}
  getInvites(): void;
  getEvents(): void;
  onDismissModal: () => void;

}
export interface IInviteReduxProps {
  invite: {invites: IExistingInvite[];}
}

// // <<<<<<<<<<<>>>>>>>>>>>>
// // <<<<<<<< FLUX >>>>>>>>>
// // <<<<<<<<<<<>>>>>>>>>>>>

export interface IAuthFunction {
  name?: string;
  email: string;
  password: string;
}

export interface IReturnErrors {
  msg: {
    msg: string | any;
  };
  status: string;
  id: any;
}

export interface IAction {
  type: string;
  payload?: any;
}