import { GET_ERRORS } from "../actions/types";

const initalState = {};

export default function(state = initalState,actions) {
    switch(actions.type){
        case GET_ERRORS: 
        return actions.payload;
        default:
            return state;
    }
}