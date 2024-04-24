import { getSession } from "@auth0/nextjs-auth0";

export function checkAuth(gssp) {
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

        const result = gssp ? await gssp(context, session.user) : { props: { user: session.user } };
        return result;
    };
}
