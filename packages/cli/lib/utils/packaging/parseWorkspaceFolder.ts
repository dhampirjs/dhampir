function parseWorkspaceFolder(workspace: string): string {
    const parts = workspace.split("/");
    return parts.slice(0, parts.length - 1).join("/");
}

export {
    parseWorkspaceFolder
}
