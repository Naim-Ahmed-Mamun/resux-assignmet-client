import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "../redux/hook";
import { userLoggedIn } from "../redux/features/auth/authSlice";
import { IUser } from "../types/globalTypes";

export default function useAuthCheck() {
    const dispatch = useAppDispatch();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const localAuth =  Cookies.get('user')

        if (localAuth) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const auth:{user:IUser} = JSON.parse(localAuth);
            if (auth) {
                dispatch(
                    userLoggedIn({
                        user: auth.user,
                    })
                );
            }
        }
        setAuthChecked(true);
    }, [dispatch, setAuthChecked]);

    return authChecked;
}