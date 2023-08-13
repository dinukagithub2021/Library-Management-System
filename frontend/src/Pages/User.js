import NavBarHome from "../Components/NavBarHome";
import '../Styles/user.css';
import '../Styles/index.css'
import img1 from '../img/About-Feature1.jpeg';
function User() {
    return (
        <div className="User">
            <NavBarHome/>
            <div className="details">
                <div className="preordered">
                    <div className="title">Pre-Ordered Books</div>
                    <div className="book-list">
                        <div className="book">
                            <div className="book-pic">
                                <img src={img1}></img>
                            </div>
                            <div className="book-details">
                                <div className="book-name">Madol Doowa</div>
                                <div className="book-author">By Martin Wickramasinghe</div>
                                <div className="rating">Rating : 4.1/5</div>
                                <button className="book-explore button-primary">Explore</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default User;