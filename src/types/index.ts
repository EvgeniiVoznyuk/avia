
interface TicketDetail {
  path: string
  time: string
  travelTime: string
  transfers: string[]
}

type TicketDetails = TicketDetail[]

export interface Ticket {
  id: number;
  price: string;
  logo: string;
  travelTime: number
  details: TicketDetails
}

export interface TicketsState {
  tickets: Ticket[];
  filters: string[];
  sort: string;
}
