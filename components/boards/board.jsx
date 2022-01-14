export default function board({obj}) {

    const publicCss='flex items-center text-white font-semibold h-8 p-2 bg-green-400 border-0 rounded-md'
    const privateCss='flex items-center text-white font-semibold h-8 p-2 bg-red-500 border-0 rounded-md'

    return(
        <div className="flex justify-between items-center flex-row w-72 h-24 m-2 bg-gray-200 p-4 shadow-lg border-0 rounded-md">
            <div className="flex items-center h-full font-semibold mr-2 ">

                <Link href={`/board/${obj.board_id}`}>{obj.title}</Link>
                
            </div>
            <div className={obj.is_private ? privateCss : publicCss }>{ obj.is_private ? 'Private' : 'Public' }</div>
        </div>
    )
};
