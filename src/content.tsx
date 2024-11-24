import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import ContentPage from "./content/ContentPage";

const root = document.createElement("div");
root.id = "_taskManagerToolForBetterBrowerExperience";
document.body.append(root);

createRoot(root).render(
    <StrictMode>
        <ContentPage />
    </StrictMode>
)
