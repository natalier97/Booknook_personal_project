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
      <div className="bookNookImg"></div>
      <div className="landingpage-container">
        <div className="landingpage-leftside">
          <div className="landingPageNytContainer">
            <NYTimesComponent
              bookcoverHeight="15vh"
              nytimesComponentContainerHeight="90vh"
              displayTooltip={true}
              overflowX={"hidden"}
              nytComponentContainerOverflowY={"hidden"}
            />
          </div>
        </div>
        <div className="landingpage-rightside">
          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default LandingPage;