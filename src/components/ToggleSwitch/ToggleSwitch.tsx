import { ChangeEventHandler } from "react";

interface ToggleSwitchProps {
    theme: string;
    switchTheme: ChangeEventHandler<HTMLInputElement>;
}

export default function ToggleSwitch({ theme, switchTheme }: ToggleSwitchProps) {
    return (
        <div className="toggle-switch" title={theme}>
            <input type="checkbox" id="toggle-switch" onChange={switchTheme} checked={theme === 'light' ? true : false} />
            <label htmlFor={"toggle-switch"} className="slider"></label>
            <p className="light-dark">{theme !== 'light' ? 'LIGHT MODE' : 'DARK MODE'}</p>
        </div>
    )
}