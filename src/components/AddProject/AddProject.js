import React, {useState} from 'react'
import './AddProject.scss'
import {firebase} from "../../firebase";
import {generatePushId} from "../../helpers/helpers";
import {useProjectsValue} from "../../context";
import {Button} from "../UI/Button/Button";

export const AddProject = ({shouldShow = false}) => {
    const [show, setShow] = useState(shouldShow);
    const [projectName, setProjectName] = useState('');

    const projectId = generatePushId();
    const {projects, setProjects} = useProjectsValue();

    const addProject = () =>
        projectName &&
        firebase
            .firestore()
            .collection('projects')
            .add({
                projectId,
                name: projectName,
                userId: 'RM6FGvtHAMviaIDJNas'
            })
            .then(() => {
                setProjects([...projects]);
                setProjectName('');
                setShow(false);
            });

    return (
        <div className="add-project-wrapper">
            {!show && <div className="add-project"
                           // data-testid="add-project"
                           aria-label="Add Project"
                           data-testid="add-project-action"
                           onClick={() => setShow(!show)}
                           onKeyDown={(e) => {
                               if (e.key === 'Enter') setShow(!show);
                           }}
                           role="button"
                           tabIndex={0}
            >
                <span className="add-project__plus">+</span>
                <span className="add-project__text">Add Project</span>
            </div>
            }
            {show && <>
                <div className="add-project__input" data-testid="add-project-inner">
                    <input
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="add-project__name"
                        data-testid="project-name"
                        type="text"
                        placeholder="Name your project"
                    />
                </div>
                <div className={'add-project__buttons'}>
                    <Button color={'primary'} label={'Add Project'} onClick={addProject}
                            dataTestId={'add-project-submit'}/>
                    <Button color={'transparent'} label={'Cancel'} onClick={() => setShow(false)}
                            dataTestId={'hide-project-overlay'}/>
                </div>
            </>}
        </div>
    );
};
