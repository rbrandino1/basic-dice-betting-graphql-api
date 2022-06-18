
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface BetInsert {
    userId: number;
    betAmount: number;
    chance: number;
}

export interface IQuery {
    getBet(id: number): Nullable<Bet> | Promise<Nullable<Bet>>;
    getBetList(): Nullable<Nullable<Bet>[]> | Promise<Nullable<Nullable<Bet>[]>>;
    getBestBetPerUser(limit: number): Nullable<Nullable<Bet>[]> | Promise<Nullable<Nullable<Bet>[]>>;
    getUser(id: number): Nullable<User> | Promise<Nullable<User>>;
    getUserList(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

export interface IMutation {
    createBet(betInsert: BetInsert): Nullable<Bet> | Promise<Nullable<Bet>>;
}

export interface Bet {
    id: number;
    userId: number;
    betAmount: number;
    chance: number;
    payout: number;
    win: boolean;
}

export interface User {
    id: number;
    name: string;
    balance: number;
}

type Nullable<T> = T | null;
