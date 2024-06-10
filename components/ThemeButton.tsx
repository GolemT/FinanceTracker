import { useTheme } from "app/ThemeContext";

export default function ThemeButton() {
  const {theme, themeMode, toggleTheme } = useTheme();

  return (
    <>
    {
    theme ==='dark'?
        <svg xmlns="http://www.w3.org/2000/svg" height="45" viewBox="0 -960 960 960" width="45" style={{margin: 10}} fill={themeMode.text} cursor='pointer' onClick={toggleTheme}><path d="M479.96-115.28q-152.49 0-258.58-106.19-106.1-106.18-106.1-258.52 0-152.34 106.19-259.06Q327.66-845.78 480-845.78q5.72 0 12.92.21 7.19.22 20.12 1.22-30.41 34.76-46.83 78.72-16.43 43.96-16.43 91.88 0 93.79 65.6 159.16 65.6 65.37 159.32 65.37 47.42 0 91.63-14.68 44.22-14.69 78.58-42.58.44 10.92.66 16.46.21 5.53.21 9.41 0 152.25-106.67 258.79-106.67 106.54-259.15 106.54Zm.2-76.72q97.54 0 172.5-59.77 74.97-59.77 96.03-140.4-21.31 9.26-46.6 13.9-25.29 4.64-48.78 3.51-112.41-7.35-191.52-85.33-79.12-77.99-87.03-193.79-.56-19 3.04-42.75 3.61-23.75 15.37-55.06-87.06 28.63-144.12 104.86Q192-570.6 192-479.83q0 120.37 83.84 204.1Q359.68-192 480.16-192Zm-9.31-279.85Z"/></svg> 
        :
        <svg xmlns="http://www.w3.org/2000/svg" height="45" viewBox="0 -960 960 960" width="45" style={{margin: 10}} fill={themeMode.text} cursor='pointer' onClick={toggleTheme}><path d="M480.13-358.78q50.46 0 86.3-35.56 35.85-35.56 35.85-85.79 0-50.46-35.82-86.3-35.83-35.85-86.44-35.85t-85.92 35.82q-35.32 35.83-35.32 86.44t35.56 85.92q35.56 35.32 85.79 35.32Zm-.07 77.28q-82.56 0-140.56-58.09-58-58.08-58-140.5 0-82.41 58.09-140.66Q397.67-679 480.09-679q82.41 0 140.66 58.19T679-480.06q0 82.56-58.19 140.56t-140.75 58ZM208.61-441.89H31.89v-76.72h176.72v76.72Zm720 0H751.89v-76.72h176.72v76.72Zm-486.72-310v-176.72h76.72v176.72h-76.72Zm0 720v-176.72h76.72v176.72h-76.72ZM261.43-645.87l-111.5-108.56 54.5-56.64 109.7 110.94-52.7 54.26Zm495.14 495.94-110.7-111.5L699-315.07l111.07 108.94-53.5 56.2ZM645.43-699l109-111.07 56.64 53.5-109.94 111.2-55.7-53.63Zm-495.5 494.57 110.5-111.2L315.07-261 206.63-150.43l-56.7-54ZM480-480Z"/></svg>
    }
    </>
  );
}