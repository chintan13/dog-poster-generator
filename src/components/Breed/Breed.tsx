import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Grid,
    SelectChangeEvent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { selectAllBreed } from "./Breed.slice";
import _ from "lodash";

const Breed = ({
    handleAddRow,
    currentNumber,
    totalRow,
    breed,
    setBreed,
    setSubBreed,
    subBreed,
    totalImageCountPerField,
    setTotalImageCountPerField,
}: {
    handleAddRow: () => void;
    currentNumber: number;
    totalRow: number;
    breed: any;
    setBreed: any;
    setSubBreed: React.Dispatch<any>;
    totalImageCountPerField: any;
    subBreed: any;
    setTotalImageCountPerField: any;
}) => {
    const allBreed = useSelector(selectAllBreed);

    const handleBreedChange = (e: SelectChangeEvent<any>) => {
        setBreed({ ...breed, [currentNumber]: e.target.value });
        setSubBreed({ ...subBreed, [currentNumber]: "" });
    };

    const handleSubBreedChange = (e: SelectChangeEvent<any>) => {
        setSubBreed({ ...subBreed, [currentNumber]: e.target.value });
    };

    return (
        <Grid
            container
            spacing={2}
            sx={{ marginTop: "0", marginBottom: "30px" }}
        >
            <Grid md={4} sx={{ padding: "0 8px" }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Breed</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={breed[currentNumber] || ""}
                        label="Age"
                        onChange={(e) => handleBreedChange(e)}
                    >
                        {_.map(allBreed, (__, key) => (
                            <MenuItem value={key} key={key}>
                                {_.capitalize(key)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid md={4} sx={{ padding: "0 8px" }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Sub-Breed
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={subBreed[currentNumber] || ""}
                        label="Age"
                        onChange={(e: any) => handleSubBreedChange(e)}
                    >
                        <MenuItem value="all">All</MenuItem>
                        {_.map(
                            _.merge(
                                _.keyBy(
                                    subBreed[currentNumber] &&
                                        subBreed[currentNumber] !== "all" && [
                                            subBreed[currentNumber],
                                        ]
                                ),
                                _.keyBy(
                                    _.difference(
                                        allBreed?.[breed[currentNumber]],
                                        _.values(subBreed)
                                    ) || []
                                )
                            ),
                            (value) => {
                                return (
                                    <MenuItem
                                        value={value}
                                        key={currentNumber + Math.random()}
                                    >
                                        {_.capitalize(value)}
                                    </MenuItem>
                                );
                            }
                        )}
                    </Select>
                </FormControl>
            </Grid>

            <Grid md={2} sx={{ padding: "0 8px" }}>
                <TextField
                    id="outlined-number"
                    label="Number"
                    type="number"
                    onChange={(e): void =>
                        setTotalImageCountPerField({
                            ...totalImageCountPerField,
                            [currentNumber]: e.target.value,
                        })
                    }
                />
            </Grid>

            <Grid md={2} sx={{ padding: "0 8px", display: "flex" }}>
                {currentNumber === totalRow && (
                    <Button
                        variant="outlined"
                        size="large"
                        color="success"
                        onClick={handleAddRow}
                    >
                        <AddIcon />
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};

export default Breed;
