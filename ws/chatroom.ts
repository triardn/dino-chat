import { WebSocket, isWebSocketCloseEvent } from "https://deno.land/std/ws/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

let sockets = new Map<string, WebSocket>();

const chatConnection = async (ws: WebSocket) => {
    // add new websocket connection to map
    const uid = v4.generate()
    sockets.set(uid, ws)

    for await (const event of ws) {
        // delete socket if connection closed
        if (isWebSocketCloseEvent(event)) {
            sockets.delete(uid)
        }

        if (typeof event === 'string') {
            let eventObject = JSON.parse(event)
        }
    }
}

export { chatConnection };