import { Reservation } from "./reservation";
import { User } from "./user";

export interface ItemFull {
    enhedId: number;
    enhedTitel: string;
    enhedBeskrivelse: string;
    enhedBemærkning: string;
    enhedBillede: string;
    enhedsType: string;
    enhedEjer: User;
    statusBesked: string;
    reservering: Reservation;
}
