import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface AccountsState {
    accounts: Accounts;
}

export interface Accounts {
    accounts: Account[];
}

export interface Account {
    accountId: string;
    currentBalance: number;
}

interface ReceiveAccountsAction {
    type: 'RECEIVE_ACCOUNTS';
    accounts: Accounts;
}

export const actionCreators = {
    requestAccounts: (): AppThunkAction<ReceiveAccountsAction> => (dispatch, getState) => {
        fetch(`api/v1/accounts`)
            .then(response => response.json() as Promise<Accounts>)
            .then(data => {
                dispatch({ type: 'RECEIVE_ACCOUNTS', accounts: data });
            });
    }
};

const unloadedState: AccountsState = { accounts: { accounts: []}};

export const reducer: Reducer<AccountsState> = (state: AccountsState | undefined, incomingAction: Action): AccountsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as ReceiveAccountsAction;
    switch (action.type) {
        case 'RECEIVE_ACCOUNTS':
            return {
                accounts: action.accounts
            };
            break;
    }

    return state;
};
