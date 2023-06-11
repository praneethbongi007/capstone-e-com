import CatagoryItem from "../categery-item/category-item.component";
import "./directory.styles.scss";

const Directory = ({ catagories }) => {
  return (
    <div className="directory-container">
      {catagories.map((catagory) => (
        <CatagoryItem key={catagory.id} catagory={catagory} />
      ))}
    </div>
  );
};

export default Directory;
