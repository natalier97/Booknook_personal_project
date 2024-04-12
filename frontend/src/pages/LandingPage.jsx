import LoginForm from "../components/LoginForm";
import BookCard from "../components/Card";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import NYTimesComponent from "../components/NYTimesComponent";




function LandingPage() {

 
  return (
    <>
      <h1>HELLLO! welcome to the Landing page</h1>

      <NYTimesComponent />
      <div>
        <LoginForm />
      </div>
    </>
  );
}

export default LandingPage;