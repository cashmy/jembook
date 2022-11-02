import { useMemo } from 'react';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

export const useActions = () => {
    const dispatch = useDispatch();

    // Bind only once so that multiple calls to useActions don't create new functions
    // This will prevent infinite loops in useEffect
    return useMemo(() => {
        return bindActionCreators(actionCreators, dispatch);
    }, [dispatch]);
};