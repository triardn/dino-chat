import { WebSocket, isWebSocketCloseEvent } from "https://deno.land/std/ws/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

let sockets = new Map<string, WebSocket>();

interface BroadcastObject {
    name: string,
    msg: string
}

// broadcast events to all clients
const broadcastEvent = (obj: BroadcastObject) => {
    sockets.forEach((ws: WebSocket) => {
        ws.send(JSON.stringify(obj))
    })
}

const chatConnection = async (ws: WebSocket) => {
    // add new websocket connection to map
    const uid = v4.generate()
    sockets.set(uid, ws)

    for await (const event of ws) {
        // delete socket if connection closed
        if (isWebSocketCloseEvent(event)) {
            sockets.delete(uid)
        }

        // create event object if event is string
        if (typeof event === 'string') {
            let eventObject = JSON.parse(event)

            // broadcast message
            broadcastEvent(eventObject)
        }
    }
}

export { chatConnection };