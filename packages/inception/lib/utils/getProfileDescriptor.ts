import { PROFILE } from '../common/profiles';

interface ProjectDescriptor {
    installDependencies: () => boolean,
}

interface ProjectDescriptorProps {
    profile: PROFILE,
}

function describeProject(opts: ProjectDescriptorProps): ProjectDescriptor {
    return {
        installDependencies: () => true,
    } as ProjectDescriptor;
}

export {
    ProjectDescriptor,
    describeProject,
}
