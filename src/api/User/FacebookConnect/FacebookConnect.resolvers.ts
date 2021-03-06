import User from "../../../entities/User";
import {
    FacebookConnectMutationArgs,
    FacebookConnectResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
    // Query: {
    //     user: (parent, args, context) => {
    //         console.log(context.req.user);
    //         return "";
    //     }
    // },
    Mutation: {
        FacebookConnect: async (
            _,
            args: FacebookConnectMutationArgs
        ): Promise<FacebookConnectResponse> => {
            const { fbId } = args;
            //유저가 있으면 로그인
            try {
                const existingUser = await User.findOne({ fbId });
                if (existingUser) {
                    const token = createJWT(existingUser.id);
                    return {
                        ok: true,
                        error: null,
                        token
                    };
                }
            } 
            //에러 처리
            catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }
            //유저가 없으면 생성 후 로그인
            try {
                const newUser = await User.create ({
                    ...args,
                    profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
                }).save();
                const token = createJWT(newUser.id);
                return {
                    ok: true,
                    error: null,
                    token
                }
            } 
            //에러 처리
            catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }
        }
    }
};

export default resolvers;