import { serve } from "https://deno.land/std/http/server.ts";
import { acceptWebSocket, acceptable } from "https://deno.land/std/ws/mod.ts";
import { chatConnection } from "./ws/chatroom.ts";

// setup server
const server = serve({ port: 4000})
console.log("up and running on port 4000")

for await (const req of server) {
    if (req.url === "/") {
        req.respond({
            status: 200,
            body: await Deno.open("./public/index.html")
        })
    }

    // accept websocket connection
    if (req.url === "/websocket") {
        if (acceptable(req)) {
            acceptWebSocket({
                conn: req.conn,
                bufReader: req.r,
                bufWriter: req.w,
                headers: req.headers,
            })
            .then(chatConnection)
        }
    }
}