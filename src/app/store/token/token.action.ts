import { createAction, props } from "@ngrx/store";
import { Payload as TokenPayload } from "../../core/interfaces/itoken"; // Ensure TokenPayload is now correctly exported

export const assign = createAction(
    '[tokenReducer] Assign',
    props<{value:TokenPayload}>()
)