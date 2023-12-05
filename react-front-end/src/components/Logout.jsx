import axios from 'axios';
import useAuth from '../hooks/useAuth';


const Logout = (props) => {
  const { setAuth } = useAuth();
  const logout = async () => {
    try {
      await axios.post("/api/logout");
      setAuth({});
    } catch (error) {
      console.log('Logout Failed');
    }
  };
  return (

    <a onClick={logout} className={props.className}>Logout</a>

  );
};

export default Logout;