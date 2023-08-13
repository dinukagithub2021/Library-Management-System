import '../Styles/About.css'
import feature1 from '../img/About-Feature1.avif'
import feature2 from '../img/About-Feature2.jpeg'
import feature3 from '../img/About-Feature3.jpeg'

function About() {
    return (
        <div className="about" id='about'>
            <div className="features-title">Our Features</div>
            <div className='features-description'>Here are the BOOKISH things you can do with our librarianX....</div>
            <div className="features">
                <div className="feature feature1">
                    <img src={feature1}></img>
                    <div className='content'>
                        <div className='content-title'>
                            Explore Books
                        </div>
                        <div className='content-description'>
                        Introducing our cutting-edge Library Management System! Seamlessly access an extensive collection of books, empowering you to explore diverse genres and knowledge realms. With user-friendly features, you can easily search, borrow, and return books hassle-free. Expand your reading horizons with our platform's vast book repository. Discover the joy of learning, all within the convenience of your fingertips.
                        </div>
                    </div>
                    {/* <button className='button-secondary'>Explore</button> */}
                </div>

                <div className="feature feature2">
                    <img src={feature2}></img>
                    <div className='content'>
                        <div className='content-title'>
                            Rate Books According To Your View
                        </div>
                        <div className='content-description'>
                        Embrace the power of your opinions with our Library Management System! Rate books and share your views, guiding fellow readers to captivating literary experiences. From thrilling page-turners to thought-provoking masterpieces, your feedback enriches our vibrant community of book enthusiasts. Join us and make every reading experience more rewarding through diverse perspectives and shared appreciation for literature!
                        </div>
                    </div>
                    {/* <button className='button-secondary'>Explore</button> */}
                </div>

                <div className="feature feature1">
                    <img src={feature3}></img>
                    <div className='content'>
                        <div className='content-title'>
                            Comment About Books
                        </div>
                        <div className='content-description'>
                        Embrace the power of your opinions with our Library Management System! Rate books and share your views, guiding fellow readers to captivating literary experiences. From thrilling page-turners to thought-provoking masterpieces, your feedback enriches our vibrant community of book enthusiasts. Join us and make every reading experience more rewarding through diverse perspectives and shared appreciation for literature!
                        </div>
                    {/* <button className='button-secondary'>Explore</button> */}
                    </div>
                    {/* <button className='button-secondary'>Explore</button> */}
                </div>
            </div>

        </div>
    );
}
 
export default About;