/* eslint-disable array-callback-return */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axiosHttp from "../../common/axiosHttp";

export interface BreedState {
    allBreed: any;
    allBreedImage: any[];
}

const initialState: BreedState = {
    allBreed: [],
    allBreedImage: [],
};

export const getBreedAction: any = createAsyncThunk<any>(
    "breed/getBreedAction",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosHttp.get("breeds/list/all");

            if (response.status === 200) {
                return response.data.message;
            }
            return rejectWithValue({
                message: "faild to take breed",
            });
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue({
                message: "faild to take breed",
            });
        }
    }
);

export const getBreedRandomImageAction: any = createAsyncThunk<string, string>(
    "breed/getBreedRandomImageAction",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosHttp.get(payload);
            if (response.status === 200) {
                return response.data.message;
            }
            return rejectWithValue({
                message: "faild to take breed",
            });
        } catch (err: any) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue({
                message: "faild to take breed",
            });
        }
    }
);

export const breedSlice = createSlice({
    name: "breed",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBreedAction.pending, (state, action) => {});
        builder.addCase(getBreedAction.fulfilled, (state, action) => {
            state.allBreed = action.payload;
        });
        builder.addCase(getBreedAction.rejected, (state) => {});
        builder.addCase(getBreedRandomImageAction.pending, (state, action) => {
            state.allBreedImage = [];
        });
        builder.addCase(
            getBreedRandomImageAction.fulfilled,
            (state, action) => {
                const imageNameArray = action.meta.arg.split("/");
                const breedName = imageNameArray[1];
                const subBreedName =
                    imageNameArray.length > 5 ? imageNameArray[2] : "";
                action.payload.map((item: any) => {
                    state.allBreedImage = [
                        ...state.allBreedImage,
                        {
                            img: item,
                            breed: breedName,
                            sub_breed: subBreedName,
                        },
                    ];
                });
            }
        );
        builder.addCase(getBreedRandomImageAction.rejected, (state) => {});
    },
});

export const selectAllBreed = (state: RootState) => state.breed.allBreed;
export const selectAllBreedImage = (state: RootState) =>
    state.breed.allBreedImage;

export default breedSlice.reducer;
