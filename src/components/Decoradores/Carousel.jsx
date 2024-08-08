import { useEffect, useRef, useState } from 'react';
import { data } from '/src/assets/data.js';
import './Carousel.css';

const Carousel = () => {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); 

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = listRef.current.offsetWidth;
      const itemWidth = containerWidth / 4; 
      setItemsPerPage(Math.floor(containerWidth / itemWidth));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const listNode = listRef.current;
    const itemWidth = listNode.offsetWidth / itemsPerPage;

    listNode.scrollTo({
      left: currentIndex * itemWidth,
      behavior: 'smooth'
    });
  }, [currentIndex, itemsPerPage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(curr => {
        const nextIndex = curr + itemsPerPage;
        return nextIndex >= data.length ? 0 : nextIndex;
      });
    }, 2000); 

    return () => clearInterval(interval);
  }, [itemsPerPage]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <section>
    <div className="main-container">
      <div className="slider-container">
        <div className="container-images" ref={listRef}>
          <ul>
            {
              data.map((item) => {
                return <li key={item.id}>
                  <img src={item.imgUrl} alt={item.title} />
                </li>
              })
            }
          </ul>
        </div>
        <div className="dots-container">
          {
            data.map((_, idx) => (
              <div key={idx}
                className={`dot-container-item ${idx === currentIndex ? "active" : ""}`}
                onClick={() => goToSlide(idx)}>
                &#9865;
              </div>))
          }
        </div>
      </div>
    </div>
    </section>
  );
};

export default Carousel;