import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { 
    AddPlaceMutationArgs,
    AddPlaceResponse
 } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolvers";

const resolver: Resolvers = {
    Mutation: {
        AddPlace: privateResolver(
            async(
                _,
                args: AddPlaceMutationArgs,
                { req }
            ):Promise<AddPlaceResponse> => {
                const user: User = req.user;
                try {
                    //Place 생성
                    await Place.create({...args, user}).save();
                    return {
                        ok: true,
                        error: null
                    };
                }
                catch(error){
                    return {
                        ok: false,
                        error: error.message
                    };
                }
            }
        )
    }
};

export default resolver;