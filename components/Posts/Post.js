import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';


const UserInfo = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
}));
const UserInitials = styled.div(() => ({
  backgroundColor: '#007bff',
  color: '#fff',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  marginRight: '10px',
}));

const PostContent = styled.div(() => ({
  marginTop: '10px',
}));

const PostContainer = styled.div(() => ({
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  margin: '10px',
  width: '300px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
}));


const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
  scrollBehavior: 'smooth',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
  width: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Post = ({ post }) => {
  const carouselRef = useRef(null);
  const { user, title, body, images } = post;
  const getInitials = name => {
    const names = name.split(' ');
    if (names.length === 1) {
      return names[0][0].toUpperCase();
    }
    return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
  };


  const handleNextClick = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth; // Scroll half the width of the carousel to show the next image
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth ; // Scroll half the width of the carousel to show the previous image
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <PostContainer>
       <UserInfo>
        <UserInitials>{user ? getInitials(user.name) : '?'}</UserInitials>
        <div>
          <div>{user ? user.name : 'User Name'}</div>
          <div>{user ? user.email : 'user@example.com'}</div>
        </div>
      </UserInfo>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{title}</h2>
        <p>{body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};





export default Post;
