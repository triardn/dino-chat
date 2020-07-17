import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

let sockets = new Map<string, WebSocket>();

const chatConnection = async (ws: WebSocket) => {
    console.log('new websocket connection')

    // add new websocket connection to map
    const uid = v4.generate()
    sockets.set(uid, ws)
}

export { chatConnection };