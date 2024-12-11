import catchError from "@/app/helpers/catchError";
import Session from "@/app/helpers/Session";

const fetchProducts = async () => {
    const accessToken: string = Session.getCookie('x-access-token');

    const [error, result] = await catchError(
        fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/admin/products/list/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            }
        })
    );

    if (error) {
        return [];
    }

    if (!result?.ok) {
        return [];
    }
    const data = await result?.json();
    return data.data.message;
}

export default fetchProducts;