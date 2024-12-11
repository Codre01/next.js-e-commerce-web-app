export const fetchUser = async ({accessToken}:{accessToken:string}) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/auth/users/me/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
    });
    const data = await res.json();
    return data;
};