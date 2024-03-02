const reducer = (state : any, action :any) : any=>{
    switch(action.type){
        case 'ADD_USER':
            console.log(action.payload)
            return {
                ...state, username: action.payload.username, id: action.payload.id
            }
    }
}

export default reducer