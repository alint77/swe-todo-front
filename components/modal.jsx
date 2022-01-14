export default function modal({isOpen,setIsOpen,children,title}) {

    if(!isOpen) return (<></>)

    return(
        <>
          <div className="fixed z-50 inset-0 m-auto h-min w-96 bg-white rounded">
            <div className="flex flex-col">
              <div className="flex h-14 border-b-2 justify-between items-center mt-2">
                <div className="font-semibold text-lg ml-4">{title}</div>
                <div
                  className="mr-4 font-bold cursor-pointer "
                  onClick={() => setIsOpen(false)}
                >
                  X
                </div>
              </div>
              <div className=" flex flex-col h-min">
                {/* BODY */}
                {children}

                
              </div>
            </div>
          </div>

          <div
            className="absolute z-index-10 w-screen h-screen inset-0 bg-opacity-50 bg-black cursor-pointer"
            onClick={() => setIsOpen(false)}
          ></div>
        </>
    )
};
