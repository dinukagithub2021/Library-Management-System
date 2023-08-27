import { useEffect, useState } from "react";
import "../Styles/index.css"
import "../Styles/librarian.css"

function Librarian() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [copies, setCopies] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const book = {title,author,copies,description,image};
        const response = await fetch('/api/books/', {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if(!response.ok){
            console.log("error!")
        }
        if(response.ok){
            setTitle('')
            setAuthor('')
            setCopies('')
            setDescription('')
            setImage('')
        }
    }

    return (
        <div className = "Librarian">
            <form className="AddBook" onSubmit={handleSubmit}>
                <h1>Add a Book</h1>
                <div className='Book-Title'>Book Title:<br/><input type='text' onChange={(e) => setTitle(e.target.value)} value={title}></input></div>
                <div className='Book-Author'>Book Author<br/><input type='input' onChange={(e) => setAuthor(e.target.value)} value={author}></input></div>
                <div className='Book-copies'>Book Copies:<br/><input type='number' onChange={(e) => setCopies(e.target.value)} value={copies}></input></div>
                <div className='Book-description'>Book Description<br/><textarea onChange={(e) => setDescription(e.target.value)} value={description}></textarea></div>
                <div className='Book-image'>Book Image<br/><input type="file" onChange={(e) => setImage(e.target.value)} value={image}></input></div>
                <button className="button-primary">Add the Book</button>
            </form>
        </div>
    );
}
 
export default Librarian;