export default function Card({card}) {
    return(
        <div className="card flex flex-col bg-white shadow-md p-2 mb-3 rounded">
        <div className="cardTopbox flex flex-row justify-between ">
          <div className="membersIcons flex flex-row p-1 ">
            {/* TODO: change to cardsmemberlist */}
                
          </div>
          <div className="createDate flex items-center rounded-sm bg-orange-200 px-1 font-semibold">
            {/* TODO: due date */}7 dec
          </div>
        </div>
        <div className="cardTitle mt-2">
          {/* TODO: */}
          card title asd sa asd asdasd asd ada asd asdas adasdasdas sa 
        </div>
      </div>
    )
};
