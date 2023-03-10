import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
    name: string;
    member: boolean;
    membershipPaid: boolean;
    membershipId: number;
    houseNumber: string;
    streetname: string;
    town: string;
    postCode: string;
    country: string;
}

const initialState: IUser = {
    name: 'John Doe',
    member: false,
    membershipPaid: false,
    membershipId: 123455,
    houseNumber: '1',
    streetname: 'High street',
    town: 'Newark',
    postCode: 'NW12 5JX',
    country: 'UK'
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addMembership(state, action: PayloadAction<IUser>) {
            if (state.member == false) {
                // console.log(state);
                //  console.log(action);
                return (state = { ...action.payload, member: true });
                // console.log(state);
            } else {
                return state;
            }
            //  console.log(state);
        }
    }
});
export const { addMembership } = userSlice.actions;
export default userSlice.reducer;
