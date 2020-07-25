import { serve } from "https://deno.land/std/http/server.ts";
import { serveFile } from "https://deno.land/std/http/file_server.ts";
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
    } else if (req.url === '/index.html') {
        try {
            const path = `${Deno.cwd()}/public/index2.html`
            const content = await serveFile(req, path)
            req.respond(content)
        } catch (e) {
            if (e && e instanceof Deno.errors.NotFound) {
                req.respond({status: 404})
            } else {
                console.log(e)
                req.respond({status: 500})
            }
        }
    } 
    else if (req.url === "/websocket") { // accept websocket connection
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