import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
    name: string;
    member: boolean;
}

const initialState: IUser = {
    name: 'John Doe',
    member: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addMembership(state, action: PayloadAction<IUser>) {
            if (state.member == false) {
                console.log(state);
                console.log(action);
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
