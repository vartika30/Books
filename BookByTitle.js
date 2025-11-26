import useFetch from "/useFetch"

const BookByTitle = ({title}) => {
    const {data, loading, error} = useFetch(
        `/book/${title}`)

console.log(data)

return data ? (
    <div>
        <h2>
            {data.title}
        </h2>
        
    </div>
):(
loading && <p>Loading...</p>
)
}
export default BookByTitle;