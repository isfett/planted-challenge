import { ProjectWithDistanceType } from "../types/Project";

export default function Project(project: ProjectWithDistanceType) {
    return (
        <div className="Project">
            <header className="Header">{project.projectName}</header>
            <div className="Distance">{(project.distance / 1000).toFixed(0)} km entfernt</div>
        </div>
    );
}
