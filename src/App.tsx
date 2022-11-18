import "./App.css";
import { Container } from "@mui/material";
import Row from "./components/Breed";
import ImageModel from "./components/ImagePopup";
import { useState } from "react";

function App() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className="App">
            <Container maxWidth="md">
                <ImageModel isOpen={isOpen} setIsOpen={setIsOpen} />
                <Row setIsOpen={setIsOpen} />
            </Container>
        </div>
    );
}

export default App;
