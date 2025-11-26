import useFetch from "/useFetch"

const BookByAuthor = ({author}) => {
    const {data, loading, error} = useFetch(
        `/book/author/${author}`)

console.log(data)

return data ? (
    <div>
        <h2>
            {data}
        </h2>
        
    </div>
):(
loading && <p>Loading...</p>
)
}
export default BookByAuthor;