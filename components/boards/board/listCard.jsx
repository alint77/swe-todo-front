import Card from "./list/cardCard";

export default function List({cards}) {

    let cardsArr=[]
    for(let i=0;i<cards;i++){
        cardsArr.push(
            <Card></Card>
        )
    }

  return (
    <div className="list flex flex-col w-72 mx-2 my-4 bg-gray-200 p-4 rounded shadow-md h-min">
      <div className="listTop flex flex-row justify-between align-middle ">
        <div className="listTitle flex items-center font-semibold  h-10 ">
          Title
        </div>
        <div
          className="listOptionsBtn h-10 font-bold cursor-pointer "
          onClick={() => handleCardOptions()}
        >
          ...
        </div>
      </div>
      <div className="listMiddle flex flex-col ">
        {/* Card Start */}
        {cardsArr}
      </div>
      <div className="listBottom flex flex-row-reverse mt-1">
        <div className="addCardBtn text-sm font-semibold ">+ Add New Card</div>
      </div>
    </div>
  );
}
