import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import breedReducer from "../components/Breed/Breed.slice";

export const store = configureStore({
    reducer: { breed: breedReducer },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
