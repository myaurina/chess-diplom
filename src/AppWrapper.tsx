import "./App.css";
import { ApplicationSettingsProvider } from "./contexts/application-settings";
import App from "./App";

function AppWrapper() {
  return (
    <ApplicationSettingsProvider>
      <App />
    </ApplicationSettingsProvider>
  );
}

export default AppWrapper;
