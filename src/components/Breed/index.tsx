import React, { useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import Breed from "./Breed";
import { useDispatch } from "react-redux";
import { getBreedAction, getBreedRandomImageAction } from "./Breed.slice";
import _ from "lodash";

const Row = ({ setIsOpen }: any) => {
    const dispatch = useDispatch();
    const [numberOfRow, setNumberOfRow] = useState([1]);

    const [breed, setBreed] = useState<object>({});

    const [subBreed, setSubBreed] = useState<any>({});
    const [totalImageCountPerField, setTotalImageCountPerField] = useState<any>(
        {}
    );

    const handleAddRow = () => {
        setNumberOfRow([...numberOfRow, numberOfRow.length + 1]);
    };

    const onSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (
        e
    ) => {
        e.preventDefault();

        const mergedObj: any = {};
        const imageCountObj: any = {};

        _.map(breed, (value, index) => {
            if (!_.isEmpty(subBreed?.[index]) && subBreed?.[index] !== "all") {
                _.merge(mergedObj, { [value]: { [index]: subBreed?.[index] } });
                _.merge(imageCountObj, {
                    [`${value}_${subBreed?.[index]}`]:
                        totalImageCountPerField[index],
                });
            } else if (
                !_.isEmpty(subBreed?.[index]) &&
                subBreed?.[index] === "all"
            ) {
                _.unset(mergedObj, [value]);
                _.merge(mergedObj, { [value]: {} });
                _.merge(imageCountObj, {
                    [value]: totalImageCountPerField[index],
                });
            } else {
                _.merge(mergedObj, { [value]: {} });
                _.merge(imageCountObj, {
                    [value]: totalImageCountPerField[index],
                });
            }
        });

        _.map(mergedObj, async (value, index) => {
            if (_.isEmpty(value)) {
                await dispatch(
                    getBreedRandomImageAction(
                        `breed/${index}/images/random/${imageCountObj[index]}`
                    )
                );
            } else {
                _.map(value, async (subBreedvalue) => {
                    await dispatch(
                        getBreedRandomImageAction(
                            `breed/${index}/${subBreedvalue}/images/random/${
                                imageCountObj[`${index}_${subBreedvalue}`]
                            }`
                        )
                    );
                });
            }
        });
        setIsOpen(true);
    };

    useEffect(() => {
        dispatch(getBreedAction());
    }, [dispatch]);

    return (
        <div>
            <Box sx={{ m: 2, width: 1 }}>
                <Stack spacing={2}>
                    <form onSubmit={onSubmit}>
                        {numberOfRow.length > 0 &&
                            numberOfRow.map((item: number, index: number) => {
                                return (
                                    <React.Fragment key={index}>
                                        <Breed
                                            handleAddRow={handleAddRow}
                                            currentNumber={index + 1}
                                            totalRow={numberOfRow.length}
                                            breed={breed}
                                            setBreed={setBreed}
                                            subBreed={subBreed}
                                            setSubBreed={setSubBreed}
                                            totalImageCountPerField={
                                                totalImageCountPerField
                                            }
                                            setTotalImageCountPerField={
                                                setTotalImageCountPerField
                                            }
                                        />
                                    </React.Fragment>
                                );
                            })}
                        <Button
                            variant="contained"
                            size="large"
                            type="submit"
                            sx={{ height: "56px", minWidth: "230px" }}
                        >
                            GENERATE
                        </Button>
                    </form>
                </Stack>
            </Box>
        </div>
    );
};

export default Row;
