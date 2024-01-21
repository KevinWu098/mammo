import React from "react";
import {
  faAppleWhole,
  faCartShopping,
  faHeart,
  faRunning,
  faSuitcaseMedical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SelfLoveTag() {
  return (
    <div
      className="p-2 bg-[#FFDCE2] rounded-xl flex items-center"
      style={{ color: "#FF3357", width: "fit-content" }}
    >
      <FontAwesomeIcon icon={faHeart} />
      <h4 className="font-semibold text-md">self-care</h4>
    </div>
  );
}
// export default SelfLoveTag

export function ExerciseTag() {
  return (
    <div
      className="p-2 bg-[#E0E5FF] rounded-xl flex items-center"
      style={{ color: "#466FFF", width: "fit-content" }}
    >
      <FontAwesomeIcon icon={faRunning} />
      <h4 className="font-semibold text-md">exercise</h4>
    </div>
  );
}
// export ExerciseTag

export function MedicalTag() {
  return (
    <div
      className="p-2 bg-[#CEEAFF] rounded-xl flex items-center"
      style={{ color: "#1C9AE1", width: "fit-content" }}
    >
      <FontAwesomeIcon icon={faSuitcaseMedical} />
      <h4 className="font-semibold text-md">exercise</h4>
    </div>
  );
}
export function PurchaseTag() {
  return (
    <div
      className="p-2 bg-[#FFE9D9] rounded-xl flex items-center"
      style={{ color: "#FF7C1D", width: "fit-content" }}
    >
      <FontAwesomeIcon icon={faCartShopping} />
      <h4 className="font-semibold text-md">exercise</h4>
    </div>
  );
}
export function DietTag() {
  return (
    <div
      className="p-2 bg-[#E2FDE3] rounded-xl flex items-center"
      style={{ color: "#14B91B", width: "fit-content" }}
    >
      <FontAwesomeIcon icon={faAppleWhole} />
      <h4 className="font-semibold text-md">exercise</h4>
    </div>
  );
}
