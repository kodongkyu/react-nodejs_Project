import Chat from "../../../entities/Chat";
import User from "../../../entities/User";
import {
    GetChatQueryArgs,
    GetChatResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolvers: Resolvers = {
    Query: {
        GetChat: privateResolver(
            async (
                _,
                args: GetChatQueryArgs,
                { req }
            ):Promise<GetChatResponse> => {
                const user: User = req.user;
                try {
                    const chat = await Chat.findOne(
                        {id: args.chatId},
                        {relations:["passenger","messages","driver"]}
                    );
                    if(chat){
                        if(chat.passengerId === user.id || chat.driverId === user.id) {
                            return {
                                ok: true,
                                error: null,
                                chat
                            };
                        }
                        else {
                            return {
                                ok: false,
                                error: "Not Authorized to See this Chat",
                                chat: null
                            };
                        }
                    }
                    else {
                        return {
                            ok: false,
                            error: " Not Found Chat",
                            chat: null
                        };
                    }
                }
                catch(error){
                    return {
                        ok: false,
                        error: error.message,
                        chat: null
                    };
                }
            }
        )
    }
};

export default resolvers;