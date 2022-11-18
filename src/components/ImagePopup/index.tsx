import React, { useEffect } from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    ImageList,
    ImageListItem,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import { useSelector } from "react-redux";
import { selectAllBreedImage } from "../Breed/Breed.slice";
import _ from "lodash";

const ImagePopup = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const allBreedImage: any[] = useSelector(selectAllBreedImage);

    const handleClose = () => {
        setIsOpen(false);
    };

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    useEffect(() => {
        if (isOpen) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [isOpen]);

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                className="dog-img-modal"
                scroll={"paper"}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Dog Images</DialogTitle>
                <DialogContent dividers={true} className="dog-img-modal-body">
                    <ImageList
                        sx={{ width: 500, height: 450, mt: 0, mb: 0 }}
                        cols={3}
                        rowHeight={164}
                        className="modal-list"
                        style={{
                            scrollbarWidth: "none",
                        }}
                    >
                        {_.size(allBreedImage) > 0 &&
                            allBreedImage.map((item: any, index: number) => {
                                return (
                                    <React.Fragment key={index}>
                                        {_.size(item) > 1 ? (
                                            <React.Fragment key={index}>
                                                <ImageListItem className="modal-list-item">
                                                    <div className="list-info">
                                                        <p className="breed">
                                                            {_.capitalize(
                                                                item.breed
                                                            )}
                                                        </p>
                                                        {item?.sub_breed && (
                                                            <p className="sub-breed">
                                                                {_.capitalize(
                                                                    item.sub_breed
                                                                )}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <img
                                                        src={item.img}
                                                        alt="item"
                                                        loading="lazy"
                                                        style={{
                                                            height: "100%",
                                                        }}
                                                    />
                                                </ImageListItem>
                                            </React.Fragment>
                                        ) : (
                                            <ImageListItem className="modal-list-item">
                                                <img
                                                    src={item}
                                                    alt="item"
                                                    loading="lazy"
                                                    style={{ height: "100%" }}
                                                />
                                            </ImageListItem>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                    </ImageList>
                </DialogContent>
                <DialogActions sx={{ padding: "10px 24px" }}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ImagePopup;
