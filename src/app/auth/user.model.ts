export class User 
{
    
    constructor(

        public userName:string,
        public message:string,
        public token:string,
        public _tokenExpirationDate:Date

    ){}

    // get token()
    // {
    //     if(!this._tokenExpirationDate || new Date()> this._tokenExpirationDate)
    //     {
    //         return null
    //     }
    //     return this._token
    // }
}