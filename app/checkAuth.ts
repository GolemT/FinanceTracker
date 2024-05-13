import { getSession } from "@auth0/nextjs-auth0";
import getContext from "./getContext";

export function checkAuth(gssp?: (context: any, user: any) => Promise<any>) {
    return async (context) => {
        const session = await getSession(context.req, context.res);

        if (!session || !session.user) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }
        getContext(session.user);

        const result = gssp ? await gssp(context, session.user) : { props: { user: session.user } };
        return result;
    };
}
