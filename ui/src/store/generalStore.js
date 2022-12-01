import { makeAutoObservable } from 'mobx';

export default class GeneralStore {
    _account = undefined;
    _owner = undefined;
    _balance = undefined;
    _web3 = undefined;
    _contract = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    get account() {
        return this._account;
    }

    setAccount(data) {
        this._account = data;
    }

    get owner() {
        return this._account;
    }

    setOwner(data) {
        this._owner = data;
    }

    get balance() {
        return this._balance;
    }

    setBalance(data) {
        this._balance = data;
    }

    get web3() {
        return this._web3;
    }

    setWeb3(data) {
        this._web3 = data;
    }

    get contract() {
        return this._contract;
    }

    setContract(data) {
        this._contract = data;
    }
}