import { useNavigate } from 'react-router-dom';

const HomeIcon = () => {
  const navigate = useNavigate();

  const goToHomepage = (event) => {
    navigate('/authorization');
  };

  return (
    <div onClick={goToHomepage} style={{marginTop: '50px', marginLeft: '45px'}}>
      <svg xmlns="http://www.w3.org/2000/svg"
        width="40px"
        height="40px"
        fill="rgb(70, 165, 253)"
        viewBox="0 0 16 16">
        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
        <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"
        />
      </svg>
      <span>{localStorage.getItem('username')}</span>
    </div>
  )
}

export default HomeIcon
