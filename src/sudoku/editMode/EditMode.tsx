import React from "react";
import { Form } from "react-bootstrap";
import { TiSortNumericallyOutline } from "react-icons/ti";
import { BsPen } from "react-icons/bs";

import { noop } from "lodash";
import { MoveTypes } from "../definitions";
import Icon from "../icon/Icon";

import "./EditMode.css";

interface Props {
  editMode: number;
  setEditMode: (mode: number) => void;
}

const NumberMode = () => <Icon onClick={noop} title="Number mode input"><TiSortNumericallyOutline /></Icon>
const CandidateMode = () => <Icon onClick={noop} title="Candidate mode input"><BsPen /></Icon>


const EditMode = (props: Props) => {
  const { editMode, setEditMode } = props;
  return (
    <ul className="edit-mode-options">
      <li>
        <Form.Check
          checked={editMode === MoveTypes.NUMBER}
          id="numberMode"
          label={<NumberMode />}
          className="edit-mode-input"
          onChange={() => setEditMode(MoveTypes.NUMBER)}
        />
      </li>
      <li>
        <Form.Check
          checked={editMode === MoveTypes.CANDIDATE}
          id="candidateMode"
          label={<CandidateMode />}
          className="edit-mode-input"
          onChange={() => setEditMode(MoveTypes.CANDIDATE)}
        />
      </li>
    </ul>
  );
};

export default EditMode;
