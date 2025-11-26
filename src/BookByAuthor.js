import useFetch from "/useFetch"

const BookByAuthor = ({author}) => {
    const {data, loading, error} = useFetch(
        `/book/author/${author}`)

//console.log(data)

return data ? (
    <div>
        <h2>
            Books By Harper Lee
        </h2>
        <ul>
        {data?.map(book => {
            <li>
                {book.title}
            </li>
        })}
    </ul>
        
    </div>
):(
loading && <p>Loading...</p>
)
}
export default BookByAuthor;