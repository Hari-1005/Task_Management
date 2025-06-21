import React, { useEffect, useState } from 'react'
import { useGetMeQuery } from "../app/features/auth/authApi";
import { useDispatch } from 'react-redux';
import { setCredentials, clearAuth } from "../app/features/auth/authSlice";

const useAuthCheck = () => {
    const {data, isLoading, isError} = useGetMeQuery();
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        if(data){
            dispatch(setCredentials(data?.user));
        }else{
            dispatch(clearAuth());
        }
    }, [])

    if(!isLoading && !isError){
        setIsChecked(true);
    }

    return isChecked
}

export default useAuthCheck