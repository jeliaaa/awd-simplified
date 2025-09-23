const DefBtn = (
    { children, ...props }
) => {
    return (
        <div
            {...props}
            className="hover:bg-gray-200 text-center w-full h-full py-3 md:border-0 border-b-2 cursor-pointer hover:text-black"
        >{children}</div>
    )
}

export default DefBtn