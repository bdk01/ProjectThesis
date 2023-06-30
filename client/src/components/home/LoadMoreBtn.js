import React from 'react'

const LoadMoreBtn = ({result, page, load, handleLoadMore}) => {
    return (
        <>
            {
                result < 2 * (page - 1) ? '' : 

                !load && <button  className="bg-white font-semibold my-3 px-6 py-2 rounded-full shadow-md "
                onClick={handleLoadMore}>
                    Load more
                </button>
            }
            
        </>
    )
}

export default LoadMoreBtn
