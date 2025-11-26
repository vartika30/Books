import Books from "Book"
import BookByTitle from "BookByTitle"
import BookByAuthor from "BookByAuthor"

export default function App(){
    return(
         <main>
<Books />
<BookByTitle title="Shoe Dog"/>
<BookByAuthor author="Harper Lee"/>
         </main>
    )
}