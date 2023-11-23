import axios from 'axios';
import useAuth from '../hooks/useAuth';


const Logout = () => {
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
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Logout;