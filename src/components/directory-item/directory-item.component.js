import "./directory-item.styles.scss";
import { useNavigate } from "react-router-dom";
const DirectoryItem = ({ catagory }) => {
  const { imageUrl, title,route } = catagory;
 const navigate = useNavigate()
 const onNavigationHandler=()=>navigate(route)
  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
