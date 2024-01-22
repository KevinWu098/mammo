import React from "react";
import {
  faAppleWhole,
  faCartShopping,
  faHeart,
  faLocation,
  faRunning,
  faSuitcaseMedical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SelfLoveTag() {
  return (
    <div
      className="p-2 bg-[#FFDCE2] rounded-xl flex items-center gap-x-1"
      style={{ color: "#FF3357", width: "fit-content" }}
    >
      <FontAwesomeIcon icon={faHeart} />
      <h4 className="font-semibold text-md">self-care</h4>
    </div>
  );
}

export function LocationTag() {
  return (
    <div
      className="p-2 bg-[#E0E5FF] rounded-xl flex items-center gap-x-1"
      style={{ color: "#466FFF", width: "fit-content" }}
    >
      <FontAwesomeIcon icon={faLocation} className="size-5" />
      <h4 className="font-semibold text-md">location</h4>
    </div>
  );
}

export function ExerciseTag() {
  return (
    <div
      className="p-2 bg-[#E0E5FF] rounded-xl flex items-center gap-x-1"
      style={{ color: "#466FFF", width: "fit-content" }}
    >
      <FontAwesomeIcon icon={faRunning} />
      <h4 className="font-semibold text-md">exercise</h4>
    </div>
  );
}

export function MedicalTag() {
  return (
    <div
      className="p-2 bg-[#CEEAFF] rounded-xl flex items-center gap-x-1"
      style={{ color: "#1C9AE1", width: "fit-content" }}
    >
      <FontAwesomeIcon icon={faSuitcaseMedical} />
      <h4 className="font-semibold text-md">medical</h4>
    </div>
  );
}
export function PurchaseTag() {
  return (
    <div
      className="p-2 bg-[#FFE9D9] rounded-xl flex items-center gap-x-1"
      style={{ color: "#FF7C1D", width: "fit-content" }}
    >
      <FontAwesomeIcon icon={faCartShopping} />
      <h4 className="font-semibold text-md">purchase</h4>
    </div>
  );
}
export function DietTag() {
  return (
    <div
      className="p-2 bg-[#E2FDE3] rounded-xl flex items-center gap-x-1"
      style={{ color: "#14B91B", width: "fit-content" }}
    >
      <FontAwesomeIcon icon={faAppleWhole} />
      <h4 className="font-semibold text-md">diet</h4>
    </div>
  );
}
