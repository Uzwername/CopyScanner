import { Runtime } from "webextension-polyfill-ts";
import { PossibleMessageTypes, GetSelectedTextLiteral } from "@/constants/messages/messages.types";

export interface GenericRequestPayload {
  type: PossibleMessageTypes,
};

export interface GetSelectedTextResponsePayload {
  type: GetSelectedTextLiteral,
  text: string,
};

type PossibleGenericOnMessageListenerCallbackReturn = GetSelectedTextResponsePayload;

interface GenericOnMessageListenerCallbackArgsShape {
  request: {
    type: PossibleMessageTypes,
  },
  sender: Runtime.MessageSender,
};

export type GenericOnMessageListenerCallback = (args: GenericOnMessageListenerCallbackArgsShape) => PossibleGenericOnMessageListenerCallbackReturn | void;

