const http=require ('http')

http.createServer((request,response)=>{

    console.log("Server Running ...")

    response._write("This is node server")
    response.end()

}).listen(3000)
console.log("server running");