import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString() * -1)

        console.log(transformed)

        callback(null, Buffer.from(String(transformed)))
    }
}

//req (request)=> ReadableStream
//res (response)=> WritableStream

const server = http.createServer(async (req, res) => {
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStramContent = Buffer.concat(buffers).toString()

    console.log(fullStramContent)

    return res.end(fullStramContent)
    
    //return req
    //    .pipe(new InverseNumberStream())
    //    .pipe(res)
})

server.listen(3334)