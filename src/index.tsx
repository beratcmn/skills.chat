import React from "react";
import { render } from "ink";
import App from "./components/App";

const { waitUntilExit } = render(<App />);

await waitUntilExit();
