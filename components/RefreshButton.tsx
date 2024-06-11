import {fetchDataAndUpdateContext, useDataContext} from "../app/getContext";
import {useTheme} from "../app/ThemeContext";

export const RefreshButton = ({ user }) => {
    const {themeMode} = useTheme();
    const {setTransactions, setTags} = useDataContext();

    const refreshContext = async () => {
        await fetchDataAndUpdateContext(user, setTransactions, setTags);
    };
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" height="45" viewBox="0 -960 960 960" width="45" fill={themeMode.text}style={{margin: 10}}  cursor='pointer' onClick={refreshContext}><path d="M168.13-155.7v-83.47h91.35l-10.65-11.35q-50.07-49.89-73.27-108.85-23.19-58.96-23.19-118.89 0-116.78 73.26-206.65t187.5-115.61v105Q341.07-674.61 297.22-614q-43.85 60.61-43.85 135.55 0 41.06 15.9 81.01 15.9 39.96 49.64 74.83l8.48 8.48V-399h83.48v243.3H168.13Zm378.74-3.78v-105q72.06-20.91 115.91-81.52 43.85-60.61 43.85-135.55 0-41.06-15.9-81.01-15.9-39.96-49.64-74.83l-8.48-8.48V-561h-83.48v-243.3h242.74v83.47h-91.35l10.65 11.35q49.92 50.37 73.19 109.08 23.27 58.7 23.27 118.9 0 116.54-73.26 206.41-73.26 89.87-187.5 115.61Z"/></svg>
        </>
    );
};