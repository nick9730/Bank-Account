import { useReducer } from "react";
import "./styles.css";
 
const initialState = {
  balance: 0,
  loan: 0,
  isActive: true,
 loanActive:true
};

function reducer(state,action){

  switch(action.type){
    case 'OpenAccount':
     return {
        ...state,
        isActive:false,
        balance:500,
        loan:0,
    

      }
      case 'deposit':
        return{
          ...state,
          balance: Number(state.balance) + Number(action.payload)
        }
        case 'withdraw':
     return {
        ...state,
        balance: Number(state.balance) - Number(action.payload)
      }
     
     case 'loan' :
      if (state.loan>0) return state
          return{
          ...state,
          loan:  action.payload,
          balance:state.balance +action.payload,
          loanActive:false,
          
        }
      
        case 'close': 
        if(state.balance === 0 && state.loan === 0 ){
          return {
            ...initialState
          }

        }
   
    
     case 'pay':
     return {
        ...state,
           
           loan :(state.balance>state.loan) ?
            ( state.balance = state.balance-state.loan,
              state.loan=0
           ) : (state.loan>state.balance)?
           (state.loan-state.balance) : '',
              
           balance : ( state.balance <state.loan) ? 0 : state.balance - state.loan
           
           
      
        }

  }

}

export default function App() {

 const [{balance,loan,isActive},dispatch] = useReducer(reducer,initialState)

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>




      <p>
        <button onClick={() =>dispatch({type:'OpenAccount'}) } disabled={!isActive}>
          Open account
        </button>
      </p>
      

      {balance >= 0 &&  <>
        <p>
        <button onClick={() =>dispatch({type:'deposit',payload: Number(150)})} disabled={isActive}>
          Deposit 150
        </button>
      </p>
      <p>
        <button onClick={() =>dispatch({type:'withdraw',payload: Number(50)})} disabled={isActive}>
          Withdraw 50
        </button>
      </p>
      <p>
        <button   onClick={() =>dispatch({type:'loan',payload: 1500})} disabled={isActive}>
          Request a loan of 1500
        </button>
      </p>
      <p>
        <button onClick={() =>dispatch({type:'pay'})} disabled={isActive}>
          Pay loan
        </button>
      </p>
      <p>
        <button onClick={() =>dispatch({type: 'close'}) } disabled={isActive}>
          Close account
        </button>
      </p>
      </>}
      {balance <0 &&  <p> You dont have money</p>}      
      
    </div>
  );
}
