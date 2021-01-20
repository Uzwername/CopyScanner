import { Runtime } from "webextension-polyfill-ts";
import { PossibleMessageTypes, GetSelectedTextLiteral } from "@/constants/messages/messages.types";

export interface GenericRequestPayload {
  type: PossibleMessageTypes,
};

export interface GetSelectedTextResponsePayload {
  type: GetSelectedTextLiteral,
  text: string,
};

interface GenericOnMessageListenerCallbackArgsShape {
  request: {
    type: PossibleMessageTypes,
  },
  sender: Runtime.MessageSender,
};

export type GenericOnMessageListenerCallback = (args: GenericOnMessageListenerCallbackArgsShape) => void;

