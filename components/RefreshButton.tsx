import {fetchDataAndUpdateContext, useDataContext} from "../app/getContext";

export const RefreshButton = ({ user }) => {
    const {setTransactions, setTags} = useDataContext();

    const refreshContext = async () => {
        await fetchDataAndUpdateContext(user, setTransactions, setTags);
    };
    return (
        <>
            <img src="/settings.svg" onClick={refreshContext} />
        </>
    );
};