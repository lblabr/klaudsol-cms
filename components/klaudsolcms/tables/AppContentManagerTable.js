import { slugTooltipText } from "constants";
import Link from "next/link";
import GeneralHoverTooltip from "components/elements/tooltips/GeneralHoverTooltip";
import { BsFillQuestionCircleFill, BsQuestionLg } from "react-icons/bs";
import { AiFillQuestionCircle, AiOutlineQuestionCircle } from "react-icons/ai";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiQuestionLine } from "react-icons/ri";

const AppContentManagerTable = ({ columns, entries, entity_type_slug }) => {

  // If entry is an object, chances are its a file uploaded to S3.
  // Files uploaded to S3 should have an originalname property
  const checkEntryIfObject = (entry, accessor) => {
    if (typeof entry[accessor] === "object") return entry[accessor].name;
    return entry[accessor];
  };

  return (
    <div id="table_general_main">
      <table id="table_general">
        {/*table head*/}
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>
                {col.displayName === 'SLUG' ?  
                <>
                {col.displayName}
                <GeneralHoverTooltip 
                  icon={<RiQuestionLine className="general-tooltip-icon"/>}
                  className="general-tooltip-button"
                  tooltipText={slugTooltipText}
                  position="top"
                /> 
                </> : col.displayName}
              </th>
            ))}
          </tr>
        </thead>
        {/*table body*/}
        <tbody>
          {entries.map((entry, i) => (
            <tr key={i}>
              {columns.map((col, index) => (
                <Link
                  href={`/admin/content-manager/${entity_type_slug}/${entry.id}`}
                  passHref
                  legacyBehavior
                  key={index}
                >
                  <td key={index}>{checkEntryIfObject(entry, col.accessor)}</td>
                </Link>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppContentManagerTable;
