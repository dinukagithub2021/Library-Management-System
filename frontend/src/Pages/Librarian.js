import "../Styles/index.css"
import "../Styles/librarian.css"

function Librarian() {
    return (
        <div className = "Librarian">
            <form className="AddBook">
                <h1>Add a Book</h1>
                <div className='Book-Title'>Book Title:<br/><input type='text'></input></div>
                <div className='Book-Author'>Book Author<br/><input type='input'></input></div>
                <div className='Book-copies'>Book Copies:<br/><input type='number'></input></div>
                <div className='Book-description'>Book Description<br/><textarea></textarea></div>
                <button className="button-primary">Add the Book</button>
            </form>
        </div>
    );
}
 
export default Librarian;