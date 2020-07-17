import { serve } from "https://deno.land/std/http/server.ts";

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
}