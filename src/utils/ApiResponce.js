// class ApiResponce{
//     constructor(statusCode,data,message="Success"){
//         this.statusCode=statusCode
//         this.data=data
//         this.message=message
//         this.success=statusCode < 400
//     }
// }


class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}