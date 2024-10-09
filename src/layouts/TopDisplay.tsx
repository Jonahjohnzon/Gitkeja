import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../redux/store'
import { authApiResponseSuccess} from '../redux/actions'
import { AuthActionTypes } from '../redux/auth/constants';
import classNames from "classnames";
import {
    Alert,
  } from "react-bootstrap";


const TopDisplay = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {topMessage, topDisplay, topColor} = useSelector((state:RootState) => state.Auth)


    useEffect(() => {
    if (topDisplay) {
              const timer = setTimeout(() => {
                dispatch({
                    type: AuthActionTypes.API_RESPONSE_SUCCESS,
                    payload: {
                        actionType: AuthActionTypes.POSTPROPERTY, // Renaming for clarity
                        data:{topDisplay: false}
                    }
                });
              }, 5000); // 5 seconds
        
              return () => clearTimeout(timer); // Cleanup timeout when the component unmounts or `topDisplay` changes
            }
    }, [topDisplay]);
  return (
    <>
     {topDisplay&&<Alert
                variant={topColor}
                className={classNames(
                  "bg-" + topColor,
                  "border-0",
                  "rounded-0",
                  topColor=== "light" ? "text-dark" : "text-white",
                  topColor === "dark" ? "text-light" : "text-white",
                  
                )}
              >
                {topMessage}
              </Alert>}
</>
  )
}

export default TopDisplay