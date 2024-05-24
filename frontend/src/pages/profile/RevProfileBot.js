
const RevProfileBot = ({value,name,email}) => {
  return (
    <div className="flex w-3/4 flex-wrap mt-8 rounded-lg shadow-lg shadow-slate-500 items-center justify-evenly p-4 justify-start bg-white h-40" >
    <button onClick={()=>value(true)} className="text-xl border-2 rounded-xl pl-4 pr-4 ">Edit</button>
      <li>Name: {name}</li>
      <li>Phone number: {"9310432578"}</li>
      <li>Email id: {email}</li>
    </div>
  )
};

export default RevProfileBot;
