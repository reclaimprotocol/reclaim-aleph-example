import { Proof } from '@reclaimprotocol/js-sdk';
import { createSlice, current } from '@reduxjs/toolkit';


interface InitialState {
  proof: Proof | null;
}

const initialState: InitialState = {
  proof: null,
};

export const proofSlice = createSlice({
  name: 'proof',
  initialState,
  reducers: {
    setProof: (state, action) => {
      state.proof = action.payload;
    },

  },
});

export const { setProof } = proofSlice.actions;
export default proofSlice.reducer;
