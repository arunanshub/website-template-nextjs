/**
 * The entire app should use one and only one serializer kind when talking via
 * oRPC. Any customization made to the serializer should be done here.
 */
import { RPCJsonSerializer } from '@orpc/client'

const oRPCSerializer = new RPCJsonSerializer({
  handlers: {
    // oRPC has no built-in Uint8Array handler, so it sends the bytes as a plain object.
    uint8array: {
      condition: (value) => value instanceof Uint8Array,
      serialize: (value: Uint8Array) => value.toBase64(),
      // The value comes from the network, so check its type before decoding.
      deserialize: (serialized) => {
        if (typeof serialized !== 'string') {
          throw new TypeError('Expected a base64 string for a Uint8Array')
        }
        return Uint8Array.fromBase64(serialized)
      },
      isTerminal: true,
    },
  },
})

export function getSerializer() {
  return oRPCSerializer
}
